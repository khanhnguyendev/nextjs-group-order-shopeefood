import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { searchGlobal } from "../shopee";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { keyword, sort_type: sortType } = await req.json();

    const searchResult = await searchGlobal(keyword, sortType);

    if (searchResult.result != "success") {
      return NextResponse.json(
        { message: searchResult.result },
        { status: 400 }
      );
    }

    return NextResponse.json({ searchResult }, { status: 200 });
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
