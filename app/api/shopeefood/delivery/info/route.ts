import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { getDeliveryInfo, getDeliveryInfoById } from "../../shopee";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);
    const shopUrl = url.searchParams.get("shopUrl");

    if (!shopUrl) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const deliveryInfo = await getDeliveryInfo(shopUrl);

    if (deliveryInfo.result !== "success") {
      return NextResponse.json(
        { message: deliveryInfo.result },
        { status: 400 }
      );
    }

    return NextResponse.json({ deliveryInfo }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const restaurantIds = await req.json();

    if (!restaurantIds) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const deliveryInfo = await getDeliveryInfoById(restaurantIds);

    if (deliveryInfo.result !== "success") {
      return NextResponse.json(
        { message: deliveryInfo.result },
        { status: 400 }
      );
    }

    return NextResponse.json({ deliveryInfo }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
