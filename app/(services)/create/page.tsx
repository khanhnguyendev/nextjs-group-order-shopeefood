import { auth } from "@clerk/nextjs";
import React from "react";

import CreateRoom from "@/components/createroom/CreateRoom";
import Link from "next/link";

const CreateRoomLayout = () => {
  // Use Clerk's auth() function to get the user's ID (if authenticated)
  const { userId } = auth();

  return (
    <div className="mx-auto text-center">
      {!userId && (
        <>
          <p className="mb-4">
            Please{" "}
            <Link href="/auth/login" className="hover:text-indigo-300 mr-4">
              LogIn
            </Link>{" "}
            to create new room!
          </p>
        </>
      )}
      {userId && (
        <>
          <div className="flex justify-center flex-wrap">
            <CreateRoom />
          </div>
        </>
      )}
    </div>
  );
};

export default CreateRoomLayout;
