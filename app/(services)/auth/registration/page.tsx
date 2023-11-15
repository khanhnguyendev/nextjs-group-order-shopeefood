// Import the SignUp component from Clerk/Next.js
import { SignUp } from "@clerk/nextjs";

// Define the type for the component's props
type Props = {};

// Create the SignUpPage component
const SignUpPage = (props: Props) => {
  return <SignUp afterSignUpUrl={"/dashboard"} />;
};

export default SignUpPage;
