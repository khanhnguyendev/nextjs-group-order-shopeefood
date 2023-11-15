import RoomAction from "@/components/room/RoomAction";
import RoomInfo from "@/components/room/RoomInfo";

const RoomIdLayout = async ({ params }: { params: { roomId: string } }) => {
  return (
    <div className="flex justify-center flex-wrap max-w-7xl">
      <div className="flex justify-center flex-wrap w-full mb-5">
        <RoomInfo roomId={params.roomId} />
      </div>
      <RoomAction params={params} />
    </div>
  );
};

export default RoomIdLayout;
