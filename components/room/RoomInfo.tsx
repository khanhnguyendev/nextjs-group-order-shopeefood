"use client";

import React, { useState, useEffect } from "react";
import { Room, Shop } from "@prisma/client";

import { getRoomData, getShopData } from "@/actions/fetcher";

import Accordion from "@/components/ui/neo-brutalism/Accordion";
import Skeleton from "../Skeleton";

interface RoomInfoProps {
  roomId: string;
}

export default function RoomInfo({ roomId }: RoomInfoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoomData] = useState<Room | null>();
  const [shop, setShopData] = useState<Shop | null>();

  useEffect(() => {
    getRoomData({ roomId }).then((room) => {
      setRoomData(room);
    });
  }, [roomId]);

  useEffect(() => {
    if (room && "restaurantId" in room && "deliveryId" in room) {
      const { restaurantId, deliveryId } = room;
      getShopData({ restaurantId, deliveryId }).then((shop) => {
        setShopData(shop);
        setIsLoading(false);
      });
    }
  }, [room]);

  if (isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  } else {
    return (
      <>
        <div className="flex w-full justify-center items-center text-center">
          {shop && (
            <Accordion
              question={shop.name}
              answer={`${shop.address}, ${shop.phones}`}
            />
          )}
        </div>
      </>
    );
  }
}
