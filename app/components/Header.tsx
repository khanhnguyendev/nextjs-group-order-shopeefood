import { auth, UserButton } from "@clerk/nextjs"; // Clerk authentication
import Link from "next/link"; // Next.js link component for navigation

// Define the type for the component's props
type Props = {};

// Create the Header component
const Header = (props: Props) => {
  // Use Clerk's auth() function to get the user's ID (if authenticated)
  const { userId } = auth();

  // Render the header section
  return (
    <div>
      {/* Navigation bar with styling */}
      <nav className="bg-indigo-900 text-indigo-50 p-4 flex items-center justify-between mb-4 dark:bg-indigo-600">
        <div className="flex items-center">
          {/* Create a link to the home page */}
          <Link href="/">
            <div className="hover:text-indigo-300 text-sm uppercase font-bold">
              Order ShopeeFood
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {/* Conditional rendering based on user authentication */}
          {!userId && (
            <>
              {/* Display login and registration links if user is not authenticated */}
              <Link href="login" className="hover:text-indigo-300 mr-4">
                LogIn
              </Link>
              <Link href="registration" className="hover:text-indigo-300 mr-4">
                Register
              </Link>
            </>
          )}
          {userId && (
            // Display the profile link if the user is authenticated
            <Link href="profile" className="hover:text-indigo-300 mr-4">
              Profile
            </Link>
          )}
          <div className="ml-auto">
            {/* Display a user button for authentication, redirects to the home page after sign-out */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
