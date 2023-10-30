// Define the type for the component's props
type Props = {};

// Create the Dashboard component
const Dashboard = (props: Props) => {
  return (
    <div className="text-center mx-auto">
      {/* Display a welcome message with styling */}
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      {/* Display a greeting message */}
      <p className="mb-5">Hello User!</p>
    </div>
  );
};

export default Dashboard;
