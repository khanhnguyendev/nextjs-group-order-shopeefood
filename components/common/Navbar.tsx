import { auth, UserButton } from "@clerk/nextjs"; // Clerk authentication
import Link from "next/link";
import { TbNewSection } from "react-icons/tb";

import Button from "@/components/ui/neo-brutalism/Button";

function Navbar() {
  // Use Clerk's auth() function to get the user's ID (if authenticated)
  const { userId } = auth();

  return (
    <nav className="left-0 top-0 z-10 mx-auto flex h-20 w-full items-center border-b-4 border-black bg-white px-5 m500:h-16 ">
      <div className="mx-auto flex w-[1300px] max-w-full items-center justify-between">
        <Link className="text-2xl font-bold m500:text-xl" href={"/"}>
          Group Order ShopeeFood
        </Link>

        <div className="flex items-center">
          {/* Conditional rendering based on user authentication */}
          {!userId && (
            <>
              {/* Display login and registration links if user is not authenticated */}
              <Link href="/auth/login" className="hover:text-indigo-300 mr-4">
                LogIn
              </Link>
              <Link
                href="/auth/registration"
                className="hover:text-indigo-300 mr-4"
              >
                Register
              </Link>
            </>
          )}
          {userId && (
            <>
              <Link href="/create" className="hover:text-indigo-300 mr-4">
                <Button>
                  Create
                  <TbNewSection className="ml-3 h-6 min-h-[24px] w-2 min-w-[24px]" />
                </Button>
              </Link>
              <Link href="/auth/profile" className="hover:text-indigo-300 mr-4">
                <button className="text-base">Profile</button>
              </Link>
              <div className="ml-auto flex items-center justify-center rounded-md border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                {/* Display a user button for authentication, redirects to the home page after sign-out */}
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
