"use client";

import React, { useState } from "react";
import { Button, Modal } from "antd";
import InputText from "@components/ui/input-text";
import axios from "axios";

interface RoomData {
  title: string;
  url: string;
}

type Props = {};

const CreateRoom = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    title: "",
    url: "",
  });

  const updateRoomData = (name: string, value: string) => {
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    createRoomAPI(roomData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createRoomAPI = async (roomData: RoomData) => {
    try {
      const now = Date.now();
      const twentyMinutesLater = new Date(now + 20 * 60 * 1000);

      const response = await axios.post("/api/create-room", {
        restaurantId: "restaurantId",
        deliveryId: "deliveryId",
        shopUrl:
          "https://shopeefood.vn/ho-chi-minh/chao-ech-singapore-geylang-truong-sa",
        roomName: "roomName",
        expiredAt: twentyMinutesLater,
        isPrivate: true,
        password: "password",
      });
      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Button className="btn btn-primary mb-2" onClick={showModal}>
        Create new group
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputText
          value={roomData.title}
          onChange={(e) => updateRoomData("title", e.target.value)}
          placeholder="Room Name"
        />
        <InputText
          value={roomData.url}
          onChange={(e) => updateRoomData("url", e.target.value)}
          placeholder="ShopeeFood URL"
        />
      </Modal>
    </div>
  );
};

export default CreateRoom;
