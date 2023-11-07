"use client";

import React, { useState, useEffect } from "react";
import { Room, Shop } from "@prisma/client";

import { getRoomData, getShopData } from "@/actions/fetcher";

import Accordion from "@/components/ui/neo-brutalism/Accordion";

interface RoomInfoProps {
  roomId: string;
}

export default function RoomInfo({ roomId }: RoomInfoProps) {
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
      });
    }
  }, [room]);

  const getImgSrc = (photos: any) => {
    const photo = photos.find((photo: any) => photo.width === 560);
    if (photo) {
      return photo.value;
    }
    return photos[0].value;
  };

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
