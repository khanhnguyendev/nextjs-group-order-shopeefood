"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import axios from "axios";

import Input from "@components/ui/Input";

type RoomData = {
  shopUrl: string;
  roomName: string;
  isPrivate: boolean;
  password: string;
};

const CreateRoom = () => {
  const router = useRouter();

  const [roomData, setRoomData] = useState<RoomData>({
    shopUrl: "",
    roomName: "",
    isPrivate: false,
    password: "",
  });

  const [error, setError] = useState<string>("");

  const updateRoomData = (name: string, value: string | boolean) => {
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createRoomAPI = async () => {
    if (validateRoomData()) {
      try {
        const now = Date.now();
        const twoHoursLater = new Date(now + 2 * 60 * 60 * 1000);

        const response = await axios.post("/api/room/create", {
          shopUrl: roomData.shopUrl,
          roomName: roomData.roomName,
          expiredAt: twoHoursLater,
          isPrivate: roomData.isPrivate,
          password: roomData.password,
        });

        if (response?.data?.id) {
          const roomId = response?.data?.id;
          router.replace(`/room/${roomId}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const resetRoomData = () => {
    setRoomData({
      shopUrl: "",
      roomName: "",
      isPrivate: false,
      password: "",
    });
    setError("");
  };

  const validateRoomData = (): boolean => {
    if (!roomData.roomName || !roomData.shopUrl) {
      setError("Room name and Shopeefood URL are required fields.");
      return false;
    }

    if (roomData.isPrivate && !roomData.password) {
      setError("Password is required for a private room.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <div
      className={classNames(
        "w-96 md:w-96 px- py-4 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center"
      )}
    >
      <div className="flex w-56 flex-col space-y-6">
        <h1 className="text-2xl mb-4">Create New Group</h1>

        <div className="flex flex-col space-y-4">
          {/* Input for Room Name */}
          <Input
            placeholder="Room Name"
            rounded="full"
            value={roomData.roomName}
            onChange={(e) => updateRoomData("roomName", e.target.value)}
          />

          {/* Input for Shopeefood URL */}
          <Input
            placeholder="Shopeefood URL"
            rounded="full"
            value={roomData.shopUrl}
            onChange={(e) => updateRoomData("shopUrl", e.target.value)}
          />

          {/* Checkbox for Private Mode */}
          <div className="flex flex-row items-center space-x-3">
            <h3>Private?</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={roomData.isPrivate}
                onChange={(e) => updateRoomData("isPrivate", e.target.checked)}
              />
            </label>
          </div>

          {/* Input for Password */}
          {roomData.isPrivate && (
            <Input
              placeholder="Password"
              rounded="full"
              value={roomData.password}
              onChange={(e) => updateRoomData("password", e.target.value)}
            />
          )}
        </div>

        {/* Button group */}
        <div className="flex space-x-2 mx-auto w-32">
          <button className="text-base" onClick={resetRoomData}>
            Cancel
          </button>
          <button
            className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full"
            onClick={createRoomAPI}
          >
            Create
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CreateRoom;
