"use client";

import React, { useState } from "react";

import MenuList from "@/components/room/menu/MenuList";
import OrderSummary from "@/components/room/order/OrderSummary";
import OrderList from "./order/OrderList";

type Props = {
  params: {
    roomId: string;
  };
};

const RoomAction = ({ params }: Props) => {
  const [activeComponent, setActiveComponent] = useState("MenuList");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveComponent(event.target.value);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center join w-full">
        {/* Menu Component */}
        <input
          className="join-item btn"
          type="radio"
          name="options"
          value="MenuList"
          checked={activeComponent === "MenuList"}
          onChange={handleRadioChange}
          aria-label="Menu"
        />

        {/* OrderList Component */}
        <input
          className="join-item btn"
          type="radio"
          name="options"
          value="OrderList"
          checked={activeComponent === "OrderList"}
          onChange={handleRadioChange}
          aria-label="Order"
        />

        {/* OrderSummary Component */}
        <input
          className="join-item btn"
          type="radio"
          name="options"
          value="OrderSummary"
          checked={activeComponent === "OrderSummary"}
          onChange={handleRadioChange}
          aria-label="Summary"
        />
      </div>

      {activeComponent === "MenuList" && (
        <MenuList params={{ roomId: params.roomId }} />
      )}

      {activeComponent === "OrderList" && (
        <OrderList params={{ roomId: params.roomId }} />
      )}

      {activeComponent === "OrderSummary" && (
        <OrderSummary params={{ roomId: params.roomId }} />
      )}
    </>
  );
};

export default RoomAction;
