import React from "react";

import MenuList from "@/components/room/MenuList";

const RoomIdLayout = async ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      <MenuList roomId={params.roomId} />
    </div>
  );
};

export default RoomIdLayout;
