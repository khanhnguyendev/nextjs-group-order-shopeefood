import CreateRoom from "@/app/components/CreateRoom";

// Define the Home functional component
export default function Home() {
  return (
    <main className="mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Hello!</h1>
      <p className="mb-4">Welcome to group order ShopeeFood</p>
      <CreateRoom />
    </main>
  );
}
