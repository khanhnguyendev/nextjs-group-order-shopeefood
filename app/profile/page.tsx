// Import the UserProfile component from Clerk/Next.js
import { UserProfile } from "@clerk/nextjs";

// Define the type for the component's props
type Props = {};

// Create the Profile component
const Profile = (props: Props) => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Profile;
