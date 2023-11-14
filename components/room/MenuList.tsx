"use client";

import React, { useState, useEffect } from "react";
import { Menu, Room } from "@prisma/client";

import { getMenuData, getRoomData } from "@/actions/fetcher";

import Loading from "@/components/common/Loading";
import FoodCard from "@/components/room/FoodCard";

interface MenuListProps {
  roomId: string;
}

export default function MenuList({ roomId }: MenuListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoomData] = useState<Room | null>();
  const [menu, setMenuData] = useState<Menu[] | null>();

  useEffect(() => {
    getRoomData({ roomId }).then((room) => {
      setRoomData(room);
    });
  }, [roomId]);

  useEffect(() => {
    if (room && "restaurantId" in room && "deliveryId" in room) {
      const { restaurantId, deliveryId } = room;
      getMenuData({ restaurantId, deliveryId }).then((menu) => {
        setMenuData(menu);
        setIsLoading(false);
      });
    }
  }, [room]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!isLoading) {
    return (
      <>
        {menu &&
          menu.map((dish) => (
            <div key={dish.id} className="flex">
              <FoodCard params={{ menu: dish, roomId: roomId }} />
            </div>
          ))}
      </>
    );
  }
}
