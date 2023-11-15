import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Order } from "@prisma/client";

import { getOrderByRoomId } from "@/actions/order";
import { formatPrice } from "@/utils/pricingUtils";
import OrderName from "./OrderName";

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
    getOrderByRoomId(roomId).then((orders) => {
      setOrderData(orders);
      setIsLoading(false);
    });
  }, [roomId]);

  if (isLoading) {
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
                  <th>Subtotal</th>
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
};

export default OrderList;
