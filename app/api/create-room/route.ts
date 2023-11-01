import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prisma from "@libs/prismadb";
import { getDeliveryInfo } from "../shopeefood/shopee";

interface CreateRoomRequest {
  restaurantId: number;
  deliveryId: number;
  shopUrl: string;
  roomName: string;
  expiredAt: Date;
  isPrivate: boolean;
  password?: string;
}

export async function POST(req: Request) {
  try {
    const createRoomRequest: CreateRoomRequest = await req.json();

    const validationError = validateCreateRoomRequest(createRoomRequest);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const shopPathName = extractShopPath(createRoomRequest.shopUrl);

    const { restaurant_id, delivery_id } = await getRestaurantAndDeliveryInfo(
      shopPathName
    );

    const createRoom = await createNewRoom({
      ...createRoomRequest,
      restaurantId: restaurant_id,
      deliveryId: delivery_id,
    });

    return NextResponse.json(
      { message: { result: "Room successfully created", data: createRoom } },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
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
    console.log(error);
    throw new Error("API request failed or returned bad data");
  }
}

async function createNewRoom(createRoomRequest: CreateRoomRequest) {
  const {
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

function isValidTime(expiredAt: Date) {
  const now = Date.now();
  const expirationTime = new Date(expiredAt).getTime();

  if (isNaN(expirationTime)) {
    // Handle the case where expiredAt is not a valid date
    return false;
  }

  return expirationTime >= now + 900 * 1000;
}
