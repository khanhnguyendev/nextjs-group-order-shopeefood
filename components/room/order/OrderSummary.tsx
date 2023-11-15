import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getOrderSummaryByRoomId } from "@/actions/order";
import { formatPrice } from "@/utils/pricingUtils";

type Props = {
  params: {
    roomId: string;
  };
};

type FoodSummary = {
  id: string;
  foodName: string;
  foodImage: string;
  orderBy: string[];
  note: string[];
  totalQuantity: number;
  totalAmount: number;
};

const OrderSummary = ({ params }: Props) => {
  const [orders, setOrderData] = useState<FoodSummary[] | null>();

  const { roomId } = params;

  useEffect(() => {
    getOrderSummaryByRoomId(roomId).then((orders) => {
      setOrderData(orders);
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
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Note</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order.id}>
                      {/* Food Name */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                src={order.foodImage}
                                alt={order.foodName}
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{order.foodName}</div>
                            {order.orderBy.map((user) => (
                              <div key={user} className="text-sm opacity-50">
                                <div className="badge badge-ghost mb-1">
                                  {user}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      {/* Food Quantity */}
                      <td>{order.totalQuantity}</td>

                      {/* Food Note */}
                      <td>
                        {order.note.map(
                          (note) =>
                            note && (
                              <div key={note}>
                                <div className="badge badge-secondary mb-1">
                                  {note}
                                </div>
                              </div>
                            )
                        )}
                      </td>

                      {/* Food Subtotal */}
                      <td>
                        <div className="badge badge-primary badge-outline">
                          {formatPrice(order.totalAmount)}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>

              {/* foot */}
              <tfoot>
                <tr>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Note</th>
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

export default OrderSummary;
