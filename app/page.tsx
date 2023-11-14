import { auth } from "@clerk/nextjs"; // Clerk authentication
import Link from "next/link";

// Define the Home functional component
export default function Home() {
  // Use Clerk's auth() function to get the user's ID (if authenticated)
  const { userId } = auth();

  return (
    <main className="mx-auto text-center">
      {!userId && (
        <>
          <p className="mb-4">Welcome to group order ShopeeFood</p>
          <p className="mb-4">
            Please{" "}
            <Link
              href="/auth/login"
              className="hover:text-indigo-300 text-red-600"
            >
              Log In
            </Link>{" "}
            to use
          </p>
        </>
      )}
      {userId && (
        <>
          <div className="flex justify-center">Welcome, {userId}</div>
        </>
      )}
    </main>
  );
}
