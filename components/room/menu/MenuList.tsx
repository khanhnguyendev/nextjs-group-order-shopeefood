"use client";

import React, { useState, useEffect } from "react";
import { Menu, Room } from "@prisma/client";

import { getMenuData, getRoomData } from "@/actions/fetcher";

import FoodCard from "@/components/room/menu/MenuCard";
import SkeletonCard from "@/components/SkeletonCard";

type MenuListProps = {
  params: {
    roomId: string;
  };
};

const MenuList = ({ params }: MenuListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoomData] = useState<Room | null>();
  const [menus, setMenuData] = useState<Menu[] | null>();

  const { roomId } = params;

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
        <div className="flex flex-wrap justify-center gap-4 py-5 mx-6 border rounded-xl">
          {[...Array(10)].map((x, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </>
    );
  }
  if (!isLoading) {
    return (
      <>
        <div className="flex flex-wrap justify-center gap-4 py-5 mx-6 border rounded-xl">
          {menus &&
            menus.map((dish) => (
              <div key={dish.id} className="flex">
                <FoodCard params={{ menu: dish, roomId: roomId }} />
              </div>
            ))}
        </div>
      </>
    );
  }
};

export default MenuList;
