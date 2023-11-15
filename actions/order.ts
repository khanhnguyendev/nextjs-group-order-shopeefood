"use server";

import prisma from "@/libs/prismadb";
import { getMenuInfo } from "./menu";
import { getImgSrc } from "@/utils/utils";

interface FoodSummary {
  id: string;
  foodName: string;
  foodImage: string;
  orderBy: string[];
  note: string[];
  totalQuantity: number;
  totalAmount: number;
}

export async function getOrderByRoomId(roomId: string) {
  return await prisma.order.findMany({
    where: {
      roomId,
    },
  });
}

export async function getOrderSummaryByRoomId(
  roomId: string
): Promise<FoodSummary[]> {
  // Get order list by roomId
  const orders = await getOrderByRoomId(roomId);

  // Use an object to store the summary for each food name
  const foodSummaryMap: { [foodName: string]: FoodSummary } = {};

  // Iterate over the orders and update the food summary
  for (const order of orders) {
    const {
      id,
      restaurantId,
      deliveryId,
      name,
      quantity,
      amount,
      userId,
      note,
    } = order;

    const menu = await getMenuInfo({ restaurantId, deliveryId, name });

    if (!foodSummaryMap[name]) {
      // If the food name is not in the map, initialize it
      foodSummaryMap[name] = {
        id: id,
        foodName: name,
        foodImage: getImgSrc(menu?.photos),
        orderBy: [userId],
        note: [note],
        totalQuantity: quantity,
        totalAmount: amount,
      };
    } else {
      // If the food name is already in the map, update the totals
      foodSummaryMap[name].totalQuantity += quantity;
      foodSummaryMap[name].totalAmount += amount;
      foodSummaryMap[name].orderBy.push(userId);
      foodSummaryMap[name].note.push(note);
    }
  }

  // Convert the object values to an array
  const foodSummaryArray: FoodSummary[] = Object.values(foodSummaryMap);

  console.log(foodSummaryArray);

  return foodSummaryArray;
}
