import React from "react";
import { Shop } from "@prisma/client";

import { getImgSrc } from "@/utils/utils";

import Card from "@/components/room/RoomCard";
import { User } from "@clerk/nextjs/server";

interface RoomListProps {
  roomId: string;
  user: User;
  shop: Shop;
}

const RoomList = ({ roomId, user, shop }: RoomListProps) => {
  return (
    <>
      {roomId && shop && (
        <div key={shop.id}>
          <Card
            roomId={roomId}
            user={user}
            title={shop.name}
            date={shop.createdAt}
            imageSrc={getImgSrc(shop.photos)}
            description={shop.description || ""}
          />
        </div>
      )}
    </>
  );
};

export default RoomList;
