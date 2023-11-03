import { auth } from "@clerk/nextjs"; // Clerk authentication

import CreateRoom from "@components/createroom/CreateRoom";

// Define the Home functional component
export default function Home() {
  // Use Clerk's auth() function to get the user's ID (if authenticated)
  const { userId } = auth();

  return (
    <main className="mx-auto text-center">
      {!userId && (
        <>
          <p className="mb-4">Welcome to group order ShopeeFood</p>
          <p className="mb-4">Please login to use!</p>
        </>
      )}
      {userId && (
        <>
          <div className="flex justify-center">
            <CreateRoom />
          </div>
        </>
      )}
    </main>
  );
}
