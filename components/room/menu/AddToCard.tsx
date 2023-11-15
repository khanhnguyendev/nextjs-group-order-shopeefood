import React, { useState } from "react";
import axios from "axios";
import { Menu } from "@prisma/client";
import { toast } from "react-toastify";

import Modal from "@/components/Modal";

type Props = {
  params: {
    dish: Menu;
    roomId: string;
  };
};

const AddToCard = ({ params }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNewOrder = async () => {
    try {
      const promise = new Promise(async (resolve, reject) => {
        const response = await axios.post("/api/order", {
          dish: params.dish,
          quantity: quantity,
          roomId: params.roomId,
          note: note,
        });
        if (response) {
          resolve(response.data);
        } else {
          reject("Error while processing your order. Please try again.");
        }
      });

      await toast.promise(promise, {
        pending: "Processing your order...",
        success: "Your order has been placed",
        error: "Error while processing your order. Please try again.",
      });
    } catch (error) {
      toast.error("Error while processing your order. Please try again.");
      console.error("Error while creating order:", error);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        {params.dish.discountPrice || params.dish.price}
      </button>
      <Modal isOpen={isModalOpen} title="Confirm your order">
        <div className="flex flex-wrap justify-center items-center gap-5">
          {/* Food Title */}
          <input
            type="text"
            value={params.dish.name}
            className="input input-bordered w-3/5"
            disabled
          />

          {/* Food Description */}
          <input
            type="text"
            value={params.dish.description || "No description"}
            className="input input-bordered w-3/5"
            disabled
          />

          {/* Food Note */}
          <input
            type="text"
            placeholder="Note"
            className="input input-bordered w-3/5"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Food Quantity */}
          <div className="flex justify-center items-center w-full">
            <input
              type="number"
              min={1}
              max={10}
              className="input input-bordered w-1/5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.valueAsNumber)}
            />
          </div>

          {/* Button Actions */}
          <div className="flex flex-wrap w-full justify-center items-center">
            <button
              className="btn btn-ghost"
              onClick={() => {
                closeModal();
              }}
            >
              Close
            </button>
            <button
              className="btn btn-success ml-2 px-6 py-[5px]"
              onClick={() => {
                closeModal();
                createNewOrder();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddToCard;
