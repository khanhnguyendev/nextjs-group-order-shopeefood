import { auth, clerkClient } from "@clerk/nextjs";
import { Menu } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { formatPrice, parsePrice } from "@/utils/pricingUtils";

const API = "/api/order";

type OrderRequest = {
  dish: Menu;
  quantity: number;
  roomId: string;
  note: string;
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orderRequest: OrderRequest = await req.json();

    const { dish, quantity, roomId, note } = orderRequest;

    const price = parsePrice(dish.discountPrice) ?? parsePrice(dish.price);

    // Check if the user has already placed an order for the same dish in the specified room
    const existingOrder = await prisma.order.findFirst({
      where: {
        userId,
        roomId,
        restaurantId: dish.restaurantId,
        deliveryId: dish.deliveryId,
        name: dish.name,
        note: note,
      },
    });

    if (existingOrder) {
      // If an order already exists, update the quantity and amount
      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          quantity: existingOrder.quantity + quantity,
          amount: existingOrder.amount + quantity * price,
        },
      });

      return NextResponse.json(`Order has been successfully updated!`);
    } else {
      // If no order exists, create a new order
      const amount = quantity * price;

      const newOrder = await prisma.order.create({
        data: {
          roomId,
          userId,
          restaurantId: dish.restaurantId,
          deliveryId: dish.deliveryId,
          name: dish.name,
          price: formatPrice(price),
          quantity: quantity,
          amount: amount,
          note: note,
        },
      });

      return NextResponse.json(`Order has been successfully created!`);
    }
  } catch (error) {
    console.error(`[${API}]--[method:POST]`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
