"use server";

import prisma from "@/libs/prismadb";

interface RoomDataProps {
  roomId: string;
}

interface MenuDataProps {
  restaurantId: number;
  deliveryId: number;
}

export async function getRoomData({ roomId }: RoomDataProps) {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  return room;
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
