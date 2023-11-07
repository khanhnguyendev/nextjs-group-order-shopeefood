import React from "react";

import MenuList from "@/components/room/MenuList";
import RoomInfo from "@/components/room/RoomInfo";

const RoomIdLayout = async ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      <RoomInfo roomId={params.roomId} />
      <MenuList roomId={params.roomId} />
    </div>
  );
};

export default RoomIdLayout;
