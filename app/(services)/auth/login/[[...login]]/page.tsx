// Import the SignIn component from Clerk/Next.js
import { SignIn } from "@clerk/nextjs";

// Define the type for the component's props
type Props = {};

// Create the Registration component
const Registration = (props: Props) => {
  return <SignIn afterSignInUrl={"/dashboard"} />;
};

export default Registration;
