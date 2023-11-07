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
  return await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}

export async function getShopData({ restaurantId, deliveryId }: ShopDataProps) {
  return await prisma.shop.findUnique({
    where: {
      restaurantId,
      deliveryId,
    },
  });
}

export async function getMenuData({ restaurantId, deliveryId }: MenuDataProps) {
  return await prisma.menu.findMany({
    where: {
      restaurantId,
      deliveryId,
    },
  });
}

export async function getListRoom() {
  const now = new Date();

  return await prisma.room.findMany();
}

export async function getListShopByDeliveryIds(deliveryIds: number[]) {
  return await prisma.shop.findMany({
    where: {
      deliveryId: {
        in: deliveryIds,
      },
    },
  });
}
