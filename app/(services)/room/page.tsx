import { clerkClient } from "@clerk/nextjs";

import { getListRoom, getShopData } from "@/actions/fetcher";

import RoomList from "@/components/room/RoomList";

export default async function RoomPage() {
  const rooms = await getListRoom();
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-5">
        {rooms && rooms.length > 0 ? (
          rooms.map(async (room) => {
            const user = await clerkClient.users.getUser(room.hostedBy);
            const shopData = await getShopData({
              restaurantId: room.restaurantId,
              deliveryId: room.deliveryId,
            });

            if (shopData) {
              return (
                <RoomList
                  key={room.id}
                  params={{
                    roomId: room.id,
                    user: user,
                    shop: shopData,
                  }}
                />
              );
            }
          })
        ) : (
          <p>No Room Available</p>
        )}
      </div>
    </>
  );
}
