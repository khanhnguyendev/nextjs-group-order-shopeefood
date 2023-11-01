"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "antd";
import InputText from "@components/Input/InputText";

type Props = {};

const CreateRoom = (props: Props) => {
  // const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomData, setRoomData] = useState({
    roomName: "",
    shopeeUrl: "",
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
    setIsModalOpen(false);
    console.log(roomData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
          value={roomData.roomName}
          onChange={(e) => updateRoomData("roomName", e.target.value)}
          placeholder="Room Name"
        />
        <InputText
          value={roomData.shopeeUrl}
          onChange={(e) => updateRoomData("shopeeUrl", e.target.value)}
          placeholder="ShopeeFood URL"
        />
      </Modal>
    </div>
  );
};

export default CreateRoom;
