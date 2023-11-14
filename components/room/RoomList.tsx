import React from "react";
import { Room, Shop } from "@prisma/client";
import { User } from "@clerk/nextjs/server";

import { getImgSrc } from "@/utils/utils";

import RoomCard from "@/components/room/RoomCard";

interface RoomListProps {
  params: {
    room: Room;
    user: User;
    shop: Shop;
  };
}

const RoomList = ({ params }: RoomListProps) => {
  return (
    <>
      {params.room && params.shop && (
        <div key={params.shop.id}>
          <RoomCard
            params={{
              room: params.room,
              user: params.user,
              title: params.shop.name,
              date: params.shop.createdAt,
              imageSrc: getImgSrc(params.shop.photos),
              description: params.shop.description ?? "",
            }}
          />
        </div>
      )}
    </>
  );
};

export default RoomList;
