import React, { useEffect, useState } from "react";

import { getOrderSummaryByRoomId } from "@/actions/order";
import { formatPrice } from "@/utils/pricingUtils";
import SummaryFood from "./SummaryFood";

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

const Summary = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summaryList, setOrderData] = useState<FoodSummary[] | null>();

  const { roomId } = params;

  useEffect(() => {
    getOrderSummaryByRoomId(roomId).then((summaryList) => {
      setOrderData(summaryList);
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
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Note</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>

                {/* body */}
                <tbody>
                  {[...Array(5)].map((x, i) => (
                    <tr key={i}>
                      {/* Food Name */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                          </div>
                          <div>
                            <div className="flex flex-col w-[120px] gap-2 ">
                              <div className="skeleton h-4 w-full"></div>
                              <div className="skeleton h-4 w-full"></div>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Food Quantity */}
                      <td>
                        <div className="skeleton h-4 w-full"></div>
                      </td>

                      {/* Food Note */}
                      <td>
                        <div className="skeleton h-4 w-full"></div>
                      </td>

                      {/* Food Subtotal */}
                      <td>
                        <div className="skeleton h-4 w-full"></div>
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
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Note</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {summaryList &&
                  summaryList.map((summary) => (
                    <tr key={summary.id}>
                      {/* Food Name */}
                      <td>
                        <SummaryFood params={{ summary: summary }} />
                      </td>

                      {/* Food Quantity */}
                      <td>{summary.totalQuantity}</td>

                      {/* Food Note */}
                      <td>
                        {summary.note.map(
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
                          {formatPrice(summary.totalAmount)}
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

export default Summary;
