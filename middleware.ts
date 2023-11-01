// Import the authMiddleware function from Clerk/Next.js
import { authMiddleware } from "@clerk/nextjs";

// Export the authMiddleware with specific public routes
export default authMiddleware({
  publicRoutes: ["/", "/auth/login", "/auth/registration"],
});

// Export a configuration object for Clerk. These are the values from the Clerk dashboard.
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
