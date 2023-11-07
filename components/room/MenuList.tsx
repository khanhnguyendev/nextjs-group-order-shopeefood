"use client";

import React, { useState, useEffect } from "react";
import { Menu, Room } from "@prisma/client";

import { getMenuData, getRoomData } from "@/actions/fetcher";

import ImageCard from "@/components/ui/neo-brutalism/ImageCard";
import Accordion from "@/components/ui/neo-brutalism/Accordion";
import Button from "@/components/ui/neo-brutalism/Button";
import { getImgSrc } from "@/utils/utils";

interface MenuListProps {
  roomId: string;
}

export default function MenuList({ roomId }: MenuListProps) {
  const [room, setRoomData] = useState<Room | null>();
  const [menu, setMenuData] = useState<Menu[] | null>();
  const [largestContentHeight, setLargestContentHeight] = useState<number>(0);

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
      });
    }
  }, [room]);

  // Calculate the height of Title food
  useEffect(() => {
    if (menu) {
      let maxHeight = 0;
      menu.forEach((dish) => {
        const length = Math.min(20 + dish.name.length * 1, 300);
        if (length > maxHeight) {
          maxHeight = length;
        }
      });
      setLargestContentHeight(maxHeight);
    }
  }, [menu]);

  const createNewOrder = () => {};

  return (
    <>
      {menu &&
        menu.map((dish) => (
          <div key={dish.id} className="flex">
            <ImageCard imageUrl={getImgSrc(dish.photos)}>
              <div className="flex flex-wrap gap-2 justify-center">
                <Accordion
                  question={dish.name}
                  answer={dish.description || "No description"}
                  largestContentHeight={largestContentHeight}
                />
                <div className="text-center mt-2">
                  <Button onClick={createNewOrder} disabled={false}>
                    {dish.discountPrice ? dish.discountPrice : dish.price}
                  </Button>
                </div>
              </div>
            </ImageCard>
          </div>
        ))}
    </>
  );
}
