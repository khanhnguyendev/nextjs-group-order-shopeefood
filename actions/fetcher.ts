"use server";

import prisma from "@/libs/prismadb";

type RoomDataProps = {
  roomId: string;
};

type ShopDataProps = {
  restaurantId: number;
  deliveryId: number;
};

type MenuDataProps = {
  restaurantId: number;
  deliveryId: number;
};

export async function getRoomData({ roomId }: RoomDataProps) {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  return room;
}

export async function getShopData({ restaurantId, deliveryId }: ShopDataProps) {
  const shop = await prisma.shop.findUnique({
    where: {
      restaurantId,
      deliveryId,
    },
  });
  return shop;
}

export async function getMenuData({ restaurantId, deliveryId }: MenuDataProps) {
  const menu = await prisma.menu.findMany({
    where: {
      restaurantId,
      deliveryId,
    },
  });
  return menu;
}
