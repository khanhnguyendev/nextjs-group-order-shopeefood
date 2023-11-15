"use server";

import prisma from "@/libs/prismadb";

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      userId,
    },
  });
}

export async function getUserNameById(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  return `${user?.firstName} ${user?.lastName}`;
}
