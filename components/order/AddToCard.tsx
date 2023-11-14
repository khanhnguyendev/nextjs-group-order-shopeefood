import React from "react";
import { Menu } from "@prisma/client";
import axios from "axios";

import Button from "@/components/ui/neo-brutalism/Button";

type Props = {
  dish: Menu;
  roomId: string;
};

const AddToCard = ({ dish, roomId }: Props) => {
  const createNewOrder = async () => {
    try {
      const response = await axios.post("/api/order", {
        dish,
        quantity: 1,
        roomId,
      });
      if (response) {
        alert(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Button onClick={createNewOrder}>
      {dish.discountPrice ? dish.discountPrice : dish.price}
    </Button>
  );
};

export default AddToCard;
