import React from "react";
import { Shop } from "@prisma/client";
import { User } from "@clerk/nextjs/server";

import { getImgSrc } from "@/utils/utils";

import RoomCard from "@/components/room/RoomCard";

interface RoomListProps {
  params: {
    roomId: string;
    user: User;
    shop: Shop;
  };
}

const RoomList = ({ params }: RoomListProps) => {
  return (
    <>
      {params.roomId && params.shop && (
        <div key={params.shop.id}>
          <RoomCard
            params={{
              roomId: params.roomId,
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
