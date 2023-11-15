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
    // Authorization
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Step 1:
    // Save user information to database
    await saveUserInfo(userId);

    // Step 2:
    // Parse data from request
    const orderRequest: OrderRequest = await req.json();
    const { dish, quantity, roomId, note } = orderRequest;
    const price = parsePrice(dish.discountPrice) ?? parsePrice(dish.price);

    // Step 3:
    // Check if the user has already placed an order for the same dish in the room
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

    // Step 4:
    // Get total spent of user
    const currentUser = await prisma.user.findUnique({ where: { userId } });
    let updatedTotalSpend = currentUser?.totalSpend || 0;

    // Step 5:
    // Save the order into database
    if (existingOrder) {
      // If an order already exists, update the quantity and amount
      const updatedOrder = await prisma.order.update({
        where: { id: existingOrder.id },
        data: {
          quantity: existingOrder.quantity + quantity,
          amount: existingOrder.amount + quantity * price,
        },
      });

      // Subtract the old amount from totalSpend and add the new amount
      updatedTotalSpend += quantity * price - existingOrder.amount;

      console.log(
        `[${API}][method:POST][UpdateOrder] - [RoomID: ${roomId}][UserID: ${currentUser?.userId}][OrderID: ${updatedOrder.id}]`
      );

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

      // Add the new amount to totalSpend
      updatedTotalSpend += amount;

      console.log(
        `[${API}][method:POST][NewOrder] [RoomID: ${roomId}][UserID: ${currentUser?.userId}][OrderID: ${newOrder.id}]`
      );

      return NextResponse.json(`Order has been successfully created!`);
    }
  } catch (error) {
    console.error(`[${API}][method:POST]`, error);
    return NextResponse.json(
      { error: "Error while processing your order" },
      { status: 500 }
    );
  }
}

// Step 1:
// Save user information to database
const saveUserInfo = async (userId: string) => {
  const currentUser = await clerkClient.users.getUser(userId);
  const existingUser = await prisma.user.findUnique({
    where: {
      userId,
    },
  });
  if (existingUser) {
    const updateUser = await prisma.user.update({
      where: { userId },
      data: {
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        imageUrl: currentUser.imageUrl,
      },
    });
    console.log(
      `[${API}][saveUserInfo][UpdateUser] - [UserID: ${updateUser.userId}]`
    );
  } else {
    const newUser = await prisma.user.create({
      data: {
        userId,
        email: currentUser.emailAddresses[0].emailAddress,
        username: currentUser.username || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        totalSpend: 0,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
        imageUrl: currentUser.imageUrl,
        gender: currentUser.gender,
        birthday: currentUser.birthday,
        lastSignInAt: currentUser.lastSignInAt || Date.now(),
      },
    });
    console.log(
      `[${API}][saveUserInfo][NewUser] - [UserID: ${newUser.userId}]`
    );
  }
};
