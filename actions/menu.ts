"use server";

import prisma from "@/libs/prismadb";

type GetMenuProps = {
  restaurantId: number;
  deliveryId: number;
  name: string;
};

export async function getMenuInfo({
  restaurantId,
  deliveryId,
  name,
}: GetMenuProps) {
  return await prisma.menu.findFirst({
    where: {
      restaurantId,
      deliveryId,
      name,
    },
  });
}
