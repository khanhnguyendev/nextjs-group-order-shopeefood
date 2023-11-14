import React from "react";

import MenuList from "@/components/room/MenuList";
import RoomInfo from "@/components/room/RoomInfo";

const RoomIdLayout = async ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="flex justify-center flex-wrap max-w-7xl">
      <div className="flex justify-center flex-wrap w-full">
        <RoomInfo roomId={params.roomId} />
      </div>
      <div className="flex justify-center flex-wrap gap-4 mt-5 py-5 mx-6 border rounded-xl">
        <MenuList roomId={params.roomId} />
      </div>
    </div>
  );
};

export default RoomIdLayout;
