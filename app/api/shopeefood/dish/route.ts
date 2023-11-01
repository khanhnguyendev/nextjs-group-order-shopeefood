import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getDeliveryDishes } from "../shopee";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const deliveryId = searchParams.get("deliveryId");

    if (!deliveryId)
      return NextResponse.json({ message: "Bad request" }, { status: 400 });

    const deliveryDishes = await getDeliveryDishes(deliveryId);

    if (deliveryDishes.result != "success") {
      return NextResponse.json(
        { message: deliveryDishes.result },
        { status: 400 }
      );
    }

    return NextResponse.json({ deliveryDishes }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
