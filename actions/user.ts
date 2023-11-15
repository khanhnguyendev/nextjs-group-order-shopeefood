"use server";

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export async function getUserById(userId: string) {
  return await clerkClient.users.getUser(userId);
}

export async function getUserAvatarById(userId: string) {
  const user: User = await clerkClient.users.getUser(userId);
  return user?.imageUrl;
}
