import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prisma from "@/libs/prismadb";
import {
  getDeliveryDetail,
  getDeliveryDishes,
  getDeliveryInfo,
} from "@/app/api/shopeefood/shopee";

const API = "/api/room/create";

type CreateRoomRequest = {
  hostedBy: string;
  restaurantId: number;
  deliveryId: number;
  dishTypeIds: number[];
  shopUrl: string;
  roomName: string;
  expiredAt: Date;
  isPrivate: boolean;
  password?: string;
};

type CreateShopRequest = {
  restaurantId: number;
  deliveryId: number;
  name: string;
  description: string | null;
  address: string;
  url: string;
  phones: string;
  photos: string[];
  categories: string[];
  rating: number;
  totalReview: number;
};

type Rating = {
  total_review: number;
  avg: number;
  display_total_review: string;
};

type DeliveryDetail = {
  restaurant_id: number;
  delivery_id: number;
  name: string;
  short_description: string;
  address: string;
  url: string;
  phones: string[];
  photos: string[];
  categories: string[];
  rating: Rating;
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

type Menu = {
  restaurantId: number;
  deliveryId: number;
  name: string;
  description: string;
  photos: string[];
  price: string;
  discountPrice: string;
  totalLike: string;
  displayOrder: number;
  isActive: boolean;
  isDeleted: boolean;
};

export async function POST(req: Request) {
  try {
    // Auth
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);

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

    // Convert strings to numbers using Number()
    const restaurantId = Number(restaurant_id);
    const deliveryId = Number(delivery_id);

    // ==========================================================
    // Step 1: Check and create Shop
    // ==========================================================
    await checkAndUpdateShop(deliveryId);

    // ==========================================================
    // Step 2: Check and create Menu
    // ==========================================================
    await checkAndUpdateDishes(restaurantId, deliveryId);

    // ==========================================================
    // Step 3: Create new Room
    // ==========================================================
    const createRoom = await createNewRoom({
      ...createRoomRequest,
      restaurantId: restaurant_id,
      deliveryId: delivery_id,
      hostedBy: user.id,
    });

    console.log(`[${API}][method:POST] Room has been successfully created!`);

    return NextResponse.json(createRoom);
  } catch (error) {
    console.error(`[${API}]--[method:POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Step 1: Check and create Shop
async function checkAndUpdateShop(deliveryId: number) {
  // Step 1.1: Retriving Restaurant Detail from ShopeeFood API
  const restaurantDetail = await getDeliveryDetail(deliveryId.toString());
  const deliveryDetail: DeliveryDetail = restaurantDetail.reply.delivery_detail;

  // Step 1.2: Convert response ShopeeAPI to Prisma Model
  const createShopRequest = convertDeliveryDetailToShop(deliveryDetail);

  // Step 1.3: Create or update RestaurantDetail in DB
  await createOrUpdateShop(createShopRequest);
}

// Step 1.2: Convert response ShopeeAPI to Prisma Model
function convertDeliveryDetailToShop(
  detail: DeliveryDetail
): CreateShopRequest {
  return {
    restaurantId: detail.restaurant_id,
    deliveryId: detail.delivery_id,
    name: detail.name,
    description: detail.short_description,
    address: detail.address,
    url: detail.url,
    phones: detail.phones[0],
    photos: detail.photos,
    categories: detail.categories,
    rating: detail.rating.avg,
    totalReview: detail.rating.total_review,
  };
}

// Step 1.3: Create or update RestaurantDetail in DB
async function createOrUpdateShop(createShopRequest: CreateShopRequest) {
  try {
    const {
      restaurantId,
      deliveryId,
      name,
      description,
      address,
      url,
      phones,
      photos,
      categories,
      rating,
      totalReview,
    } = createShopRequest;

    const existingShop = await prisma.shop.findFirst({
      where: {
        deliveryId,
      },
    });

    if (existingShop) {
      console.log(`[${API}][createOrUpdateShop] Updating shop data...`);
      const updatedShop = await prisma.shop.update({
        where: { id: existingShop.id },
        data: {
          name,
          description,
          address,
          url,
          phones,
          photos,
          categories,
          rating,
          totalReview,
        },
      });
      console.log(
        `[${API}][createOrUpdateShop] Shop has been successfully updated!`
      );
    } else {
      console.log(`[${API}][createOrUpdateShop] Creating new shop...`);
      const newShop = await prisma.shop.create({
        data: {
          restaurantId,
          deliveryId,
          name,
          description,
          address,
          url,
          phones,
          photos,
          categories,
          rating,
          totalReview,
        },
      });
      console.log(
        `[${API}][createOrUpdateShop] Shop has been successfully created!`
      );
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Shop already exists");
      }
    }

    console.error(e);
    throw e;
  }
}

// Step 2: Check and create Menu
async function checkAndUpdateDishes(restaurantId: number, deliveryId: number) {
  // Step 2.1: Retriving Menu from ShopeeFood API
  const dishesFromAPI = await getDeliveryDishes(deliveryId.toString());

  // Step 2.2: Create or update Menu
  await createOrUpdateDishes(restaurantId, deliveryId, dishesFromAPI);
}

// Step 2.2: Create or update Menu
async function createOrUpdateDishes(
  restaurantId: number,
  deliveryId: number,
  dishesFromAPI: any
) {
  // Step 2.2.1: Retriving Menu from DB
  const existingDishes = await prisma.menu.findMany({
    where: {
      restaurantId,
      deliveryId,
    },
  });

  // Step 2.2.2: Response ShopeeAPI
  const menuInfo: MenuInfo[] = dishesFromAPI.reply.menu_infos;
  const numOfDishesAPI = menuInfo.reduce((total, dishType) => {
    return total + dishType.dishes.length;
  }, 0);

  // Step 2.2.3: Compare the quantity of dishes (DB vs ShopeeAPI)
  if (numOfDishesAPI !== existingDishes.length) {
    console.warn(
      `[${API}][checkAndUpdateDishes] Dishes is out of date or conflict with API `
    );
    console.log(
      `[${API}][checkAndUpdateDishes] API: ${numOfDishesAPI} -- DB: ${existingDishes.length}`
    );
    console.log(`[${API}][checkAndUpdateDishes] Removing old dishes...`);
    // Step 2.2.3.1: Remove old Menu in the database
    await removeMenus(restaurantId, deliveryId);

    // Step 2.2.3.2: Create new Menu
    console.log(`[${API}][checkAndUpdateDishes] Updating new dishes...`);
    await createMenuRoom(dishesFromAPI, restaurantId, deliveryId);
  }

  console.log(`[${API}][checkAndUpdateDishes] Dishes is up-to-date!`);
}

// Step 2.2.3.1: Remove old Menu in the database
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

// Step 2.2.3.2: Create new Menu
async function createMenuRoom(
  dishesFromAPI: any,
  restaurantId: number,
  deliveryId: number
) {
  const menuInfo: MenuInfo[] = dishesFromAPI.reply.menu_infos;
  const menus: Dish[] = [];

  menuInfo.forEach((menu) => {
    const { dishes } = menu;

    dishes.forEach((dish) => {
      const updatedDish: Dish = {
        ...dish,
        restaurant_id: restaurantId,
        delivery_id: deliveryId,
      };
      menus.push(updatedDish);
    });
  });

  const listOfMenus: Menu[] = convertDishesToMenus(menus);

  // Step 2.2.3.2.1: Save Menus to DB
  await saveMenusInBatches(listOfMenus);
}

// Step 2.2.3.2.1: Save Menus to DB using batch
async function saveMenusInBatches(menus: Menu[]) {
  const batchSize = 100;

  for (let i = 0; i < menus.length; i += batchSize) {
    const batch = menus.slice(i, i + batchSize);
    // Step 2.2.3.2.1.1: Save Menu to DB
    await saveMenus(batch);
  }
}

// Step 2.2.3.2.1.1: Save Menu to DB
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

// Step 3: Create new Room
async function createNewRoom(createRoomRequest: CreateRoomRequest) {
  const {
    hostedBy,
    restaurantId,
    deliveryId,
    shopUrl,
    roomName,
    expiredAt,
    isPrivate,
    password,
  } = createRoomRequest;
  try {
    return await prisma.room.create({
      data: {
        hostedBy,
        restaurantId,
        deliveryId,
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
