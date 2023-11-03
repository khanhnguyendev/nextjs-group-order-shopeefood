import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prisma from "@libs/prismadb";
import { getDeliveryDishes, getDeliveryInfo } from "../../shopeefood/shopee";

const API = "/api/room/create";

type CreateRoomRequest = {
  restaurantId: number;
  deliveryId: number;
  dishTypeIds: number[];
  shopUrl: string;
  roomName: string;
  expiredAt: Date;
  isPrivate: boolean;
  password?: string;
};

type MenuInfo = {
  dish_type_id: number;
  dish_type_name: string;
  dishes: Dish[];
};

type Dish = {
  restaurant_id: number;
  delivery_id: number;
  dish_type_id: number;
  dish_type_name: string;
  name: string;
  description: string | "";
  photos: string[];
  price: Price;
  discount_price: Price | null;
  total_like: string;
  display_order: number;
  is_active: boolean;
  is_deleted: boolean;
};

type Price = {
  text: string;
  unit: string;
  value: string;
};

interface Menu {
  restaurantId: number;
  deliveryId: number;
  dishTypeId: number;
  dishTypeName: string;
  name: string;
  description: string;
  photos: string[];
  price: string;
  discountPrice: string;
  totalLike: string;
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
}

export async function POST(req: Request) {
  try {
    // Auth
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const createRoomRequest: CreateRoomRequest = await req.json();
    const validationError = validateCreateRoomRequest(createRoomRequest);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    console.log(`[${API}][method:POST] Creating new room...`);

    // Get Restaurant Info
    const shopPathName = extractShopPath(createRoomRequest.shopUrl);
    const { restaurant_id, delivery_id } = await getRestaurantAndDeliveryInfo(
      shopPathName
    );

    // Get Restaurant menu from ShopeeFood API
    const dishesFromAPI = await getDeliveryDishes(delivery_id);
    const menuInfo: MenuInfo[] = dishesFromAPI.reply.menu_infos;
    const dishTypeIds: number[] = [];

    // Get Restaurant dish type ids
    menuInfo.forEach((dish) => {
      dishTypeIds.push(dish.dish_type_id);
    });

    await checkAndUpdateDishes(restaurant_id, delivery_id, dishesFromAPI);

    // Save Restaurant info to db
    const createRoom = await createNewRoom({
      ...createRoomRequest,
      restaurantId: restaurant_id,
      deliveryId: delivery_id,
      dishTypeIds: dishTypeIds,
    });

    console.log(`[${API}][method:POST] Room has been successfully created!`);

    return NextResponse.json(createRoom);
  } catch (error) {
    console.error(`[${API}]--[method:POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Create room
async function createNewRoom(createRoomRequest: CreateRoomRequest) {
  const {
    restaurantId,
    deliveryId,
    dishTypeIds,
    shopUrl,
    roomName,
    expiredAt,
    isPrivate,
    password,
  } = createRoomRequest;
  try {
    return await prisma.room.create({
      data: {
        restaurantId,
        deliveryId,
        dishTypeIds,
        shopUrl,
        roomName,
        expiredAt,
        isPrivate,
        password,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    console.error(e);
    throw e;
  }
}

// Check and update dishes
async function checkAndUpdateDishes(
  restaurantId: number,
  deliveryId: number,
  dishesFromAPI: any
) {
  const dishesFromDB = await prisma.menu.findMany({
    where: {
      deliveryId,
      restaurantId,
    },
  });

  const menuInfo: MenuInfo[] = dishesFromAPI.reply.menu_infos;
  const numOfDishesAPI = menuInfo.reduce((total, dishType) => {
    return total + dishType.dishes.length;
  }, 0);

  // Compare the quantity of dishes
  if (numOfDishesAPI !== dishesFromDB.length) {
    console.warn(
      `[${API}][checkAndUpdateDishes] Dishes is out of date or conflict with API `
    );
    console.log(
      `[${API}][checkAndUpdateDishes] API: ${numOfDishesAPI} -- DB: ${dishesFromDB.length}`
    );
    console.log(`[${API}][checkAndUpdateDishes] Removing old dishes...`);
    // Remove old dishes in the database
    await removeMenus(restaurantId, deliveryId);

    // Save menu to db
    console.log(`[${API}][checkAndUpdateDishes] Updating new dishes...`);
    await createMenuRoom(dishesFromAPI, restaurantId, deliveryId);
  }

  console.log(`[${API}][checkAndUpdateDishes] Dishes is up-to-date!`);
}

// Remove dishes
async function removeMenus(restaurantId: number, deliveryId: number) {
  const oldMenu = await prisma.menu.deleteMany({
    where: {
      deliveryId,
      restaurantId,
    },
  });
  console.log(
    `[${API}][removeMenus] Old dishes is successfully removed `,
    oldMenu
  );
}

// Create dishes of room
async function createMenuRoom(
  dishesFromAPI: any,
  restaurantId: number,
  deliveryId: number
) {
  const menuInfo: MenuInfo[] = dishesFromAPI.reply.menu_infos;
  const menus: Dish[] = [];

  menuInfo.forEach((menu) => {
    const { dish_type_id, dish_type_name, dishes } = menu;

    dishes.forEach((dish) => {
      const updatedDish: Dish = {
        ...dish,
        restaurant_id: restaurantId,
        delivery_id: deliveryId,
        dish_type_id,
        dish_type_name,
      };
      menus.push(updatedDish);
    });
  });

  const listOfMenus: Menu[] = convertDishesToMenus(menus);

  // Save dishes to DB
  await saveMenusInBatches(listOfMenus);
}

async function saveMenusInBatches(menus: Menu[]) {
  const batchSize = 100;

  for (let i = 0; i < menus.length; i += batchSize) {
    const batch = menus.slice(i, i + batchSize);
    await saveMenus(batch);
  }
}

async function saveMenus(menus: Menu[]) {
  try {
    const createdMenus = await prisma.menu.createMany({
      data: menus,
    });

    console.log(
      `[${API}][saveMenus] Dishes is successfully saved`,
      createdMenus
    );
  } catch (error) {
    console.error(`[${API}][saveMenus]`, error);
    throw error; // Consider handling the error or rethrowing it if needed
  }
}

function validateCreateRoomRequest(createRoomRequest: CreateRoomRequest) {
  const { roomName, shopUrl, expiredAt, isPrivate, password } =
    createRoomRequest;

  if (!roomName) {
    return "Please provide a room name";
  }

  if (!shopUrl) {
    return "Please provide a shop URL";
  }

  if (typeof isPrivate === "undefined" || isPrivate === null) {
    return "Please specify the room type (private or public)";
  }

  if (isPrivate === true && !password) {
    return "A password is required for private rooms";
  }

  if (!isValidTime(expiredAt)) {
    return "Invalid expiration time (at least 15 minutes)";
  }

  return null; // No validation error
}

function extractShopPath(shopUrl: string) {
  // Input: https://shopeefood.vn/ho-chi-minh/nho-sinh-to-nuoc-ep
  const url = new URL(shopUrl);
  // Output: ho-chi-minh/nho-sinh-to-nuoc-ep
  return url.pathname.replace(/^\//, "");
}

async function getRestaurantAndDeliveryInfo(shopPathName: string) {
  try {
    const response = await getDeliveryInfo(shopPathName);

    if (!response || response.result !== "success") {
      throw new Error(
        "Failed to fetch restaurant and delivery information from the API"
      );
    }

    return response.reply;
  } catch (error) {
    console.log(`[${API}][getRestaurantAndDeliveryInfo]`, error);
    throw new Error("API request failed or returned bad data");
  }
}

function isValidTime(expiredAt: Date) {
  const now = Date.now();
  const expirationTime = new Date(expiredAt).getTime();

  if (isNaN(expirationTime)) {
    // Handle the case where expiredAt is not a valid date
    return false;
  }

  return expirationTime >= now + 900 * 1000;
}

function convertDishesToMenus(dishes: Dish[]): Menu[] {
  return dishes.map((dish) => convertDishToMenu(dish));
}

function convertDishToMenu(dish: Dish): Menu {
  return {
    restaurantId: dish.restaurant_id,
    deliveryId: dish.delivery_id,
    dishTypeId: dish.dish_type_id,
    dishTypeName: dish.dish_type_name,
    name: dish.name,
    description: dish.description !== null ? dish.description : "",
    photos: dish.photos,
    price: (dish.price && dish.price.text) || "",
    discountPrice: (dish.discount_price && dish.discount_price.text) || "",
    totalLike: dish.total_like,
    displayOrder: dish.display_order,
    isActive: dish.is_active,
    isDeleted: dish.is_deleted,
  };
}
