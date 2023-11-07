import { auth } from "@clerk/nextjs";
import React from "react";

import CreateRoom from "@/components/createroom/CreateRoom";

const CreateRoomLayout = () => {
  // Use Clerk's auth() function to get the user's ID (if authenticated)
  const { userId } = auth();

  return (
    <div className="mx-auto text-center">
      {!userId && (
        <>
          <p className="mb-4">Welcome to group order ShopeeFood</p>
          <p className="mb-4">Please login to use!</p>
        </>
      )}
      {userId && (
        <>
          <div className="flex justify-center flex-wrap">
            <CreateRoom />
            <CreateRoom />
            <CreateRoom />
            <CreateRoom />
            <CreateRoom />
            <CreateRoom />
            <CreateRoom />
            <CreateRoom />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateRoomLayout;
