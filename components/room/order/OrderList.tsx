import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { Order } from "@prisma/client";

import { getOrderByRoomId } from "@/actions/order";
import { formatPrice } from "@/utils/pricingUtils";

import OrderName from "@/components/room/order/OrderName";
import UpdateModal from "./UpdateModal";
import Modal from "@/components/Modal";

type Props = {
  params: {
    roomId: string;
  };
};

const OrderList = ({ params }: Props) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuantity, setNewQuantity] = useState(1);
  const [newNote, setNewNote] = useState("");
  const [orders, setOrderData] = useState<Order[] | null>();

  const { roomId } = params;

  useEffect(() => {
    getOrderByRoomId(roomId).then((orders) => {
      setOrderData(orders);
      setIsLoading(false);
    });
  }, [roomId]);

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const updateOrder = (orderId: string) => {
    toast.warning(`Updating order ${orderId}`);
  };

  const deleteOrder = (orderId: string) => {
    toast.error(`Deleting order ${orderId}`);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-wrap justify-center gap-4 py-5 mx-6 border rounded-xl">
          <div className="grid card rounded-box place-items-center">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>Food</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>

                {/* body */}
                <tbody>
                  {[...Array(5)].map((x, i) => (
                    <tr key={i}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      {/* Name */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                          </div>
                          <div className="flex flex-col w-[120px] gap-2 ">
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                          </div>
                        </div>
                      </td>
                      {/* Food */}
                      <td>
                        <div className="flex flex-wrap w-[120px] gap-2 ">
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      </td>
                      {/* Subtotal */}
                      <td>
                        <div className="flex flex-wrap gap-2">
                          <div className="skeleton h-4 w-28"></div>
                        </div>
                      </td>
                      <th>
                        <button className="btn btn-outline btn-success btn-xs mr-1">
                          <FaRegEdit />
                        </button>
                        <button className="btn btn-outline btn-error btn-xs">
                          <MdOutlineDeleteForever />
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>

                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Food</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 py-5 mx-6 border rounded-xl">
        <div className="grid card rounded-box place-items-center">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Food</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <>
                      {/* Update Order Modal */}
                      <Modal
                        isOpen={isUpdateModalOpen}
                        title="Update your order"
                      >
                        <div
                          key={order.id}
                          className="flex flex-wrap justify-center items-center gap-5"
                        >
                          {/* Food Title */}
                          <input
                            type="text"
                            value={order.name}
                            className="input input-bordered w-3/5"
                            disabled
                          />

                          {/* Food Note */}
                          <input
                            type="text"
                            value={order.note}
                            className="input input-bordered w-3/5"
                            onChange={(e) => setNewNote(e.target.value)}
                          />

                          {/* Food Quantity */}
                          <div className="flex justify-center items-center w-full">
                            <input
                              type="number"
                              min={1}
                              max={10}
                              className="input input-bordered w-1/5"
                              value={order.quantity}
                              onChange={(e) =>
                                setNewQuantity(e.target.valueAsNumber)
                              }
                            />
                          </div>

                          {/* Button Actions */}
                          <div className="flex flex-wrap w-full justify-center items-center">
                            <button
                              className="btn btn-ghost"
                              onClick={() => {
                                closeUpdateModal();
                              }}
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-success ml-2 px-6 py-[5px]"
                              onClick={() => {
                                closeUpdateModal();
                                updateOrder(order.id);
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </Modal>
                      {/* Delete Order Modal */}
                      <Modal
                        isOpen={isDeleteModalOpen}
                        title="Delete your order"
                      >
                        <div
                          key={order.id}
                          className="flex flex-wrap justify-center items-center gap-5"
                        >
                          {/* Food Title */}
                          <input
                            type="text"
                            value={order.name}
                            className="input input-bordered w-3/5"
                            disabled
                          />

                          {/* Food Note */}
                          <input
                            type="text"
                            value={order.note}
                            className="input input-bordered w-3/5"
                            disabled
                          />

                          {/* Food Quantity */}
                          <div className="flex justify-center items-center w-full">
                            <input
                              type="number"
                              min={1}
                              max={10}
                              className="input input-bordered w-1/5"
                              value={order.quantity}
                              disabled
                            />
                          </div>

                          {/* Button Actions */}
                          <div className="flex flex-wrap w-full justify-center items-center">
                            <button
                              className="btn btn-ghost"
                              onClick={() => {
                                closeDeleteModal();
                              }}
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-success ml-2 px-6 py-[5px]"
                              onClick={() => {
                                closeDeleteModal();
                                deleteOrder(order.id);
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <tr>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        {/* Name */}
                        <td>
                          <OrderName params={{ order: order }} />
                        </td>
                        {/* Food */}
                        <td>
                          {order.name} x {order.quantity}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {order.price}
                          </span>
                          <br />
                          {order.note && (
                            <span className="badge badge-secondary badge-sm">
                              {order.note}
                            </span>
                          )}
                        </td>
                        {/* Subtotal */}
                        <td>
                          <div className="badge badge-secondary badge-outline">
                            {formatPrice(order.amount)}
                          </div>
                        </td>
                        <th>
                          <button
                            className="btn btn-outline btn-success btn-xs mr-1"
                            onClick={openUpdateModal}
                          >
                            <FaRegEdit />
                          </button>
                          <button
                            className="btn btn-outline btn-error btn-xs"
                            onClick={openDeleteModal}
                          >
                            <MdOutlineDeleteForever />
                          </button>
                        </th>
                      </tr>
                    </>
                  ))}
              </tbody>

              {/* foot */}
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Food</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
