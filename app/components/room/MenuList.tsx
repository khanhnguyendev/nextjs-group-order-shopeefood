"use client";

import React, { useState, useEffect } from "react";
import { Menu, Room } from "@prisma/client";

import { getMenuData, getRoomData } from "../../../actions/fetcher";

import ImageCard from "../ui/neo-brutalism/ImageCard";
import Accordion from "../ui/neo-brutalism/Accordion";
import Button from "../ui/neo-brutalism/Button";

interface ServerSidebarProps {
  roomId: string;
}

export default function MenuList({ roomId }: ServerSidebarProps) {
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

  const getImgSrc = (photos: any) => {
    const photo = photos.find((photo: any) => photo.width === 560);
    if (photo) {
      return photo.value;
    }
    return photos[0].value;
  };

  const createNewOrder = () => {};

  return (
    <>
      {menu &&
        menu.map((dish) => (
          <div key={dish.id} className="flex relative">
            <ImageCard imageUrl={getImgSrc(dish.photos)}>
              <div className="flex flex-wrap gap-2 justify-center">
                <Accordion
                  question={dish.name}
                  answer={dish.description || "No description"}
                  largestContentHeight={largestContentHeight}
                />
                <div className="text-center mt-2">
                  <Button onClick={createNewOrder} disabled={false}>
                    {dish.discountPrice}
                  </Button>
                </div>
              </div>
            </ImageCard>
          </div>
        ))}
    </>
  );
}