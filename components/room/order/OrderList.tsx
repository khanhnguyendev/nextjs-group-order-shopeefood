import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Image from "next/image";
import { Order } from "@prisma/client";

import { getOrderByRoomId } from "@/actions/order";
import { getDateAsString } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/pricingUtils";

type Props = {
  params: {
    roomId: string;
  };
};

const OrderList = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrderData] = useState<Order[] | null>();

  const { roomId } = params;

  useEffect(() => {
    getOrderByRoomId(roomId).then((order) => {
      setOrderData(order);
    });
  }, [roomId]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-5 py-5 mx-6 border rounded-xl">
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
                  <th>Totals</th>
                  <th></th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src="https://www.svgrepo.com/show/452030/avatar-default.svg"
                                alt=""
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{order.userId}</div>
                            <div className="text-sm opacity-50">
                              {getDateAsString(order.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
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
                      <td>
                        <div className="badge badge-secondary badge-outline">
                          {formatPrice(order.amount)}
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
                  <th>Totals</th>
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
