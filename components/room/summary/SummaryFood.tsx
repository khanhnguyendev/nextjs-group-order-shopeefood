import React, { useEffect, useState } from "react";
import Image from "next/image";

import { getUserNameById } from "@/actions/user";

type Props = {
  params: {
    summary: Summary;
  };
};

type Summary = {
  id: string;
  foodName: string;
  foodImage: string;
  orderBy: string[];
  note: string[];
  totalQuantity: number;
  totalAmount: number;
};

const SummaryFood = ({ params }: Props) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    // Get user name
    const getUserName = async () => {
      const userNames = await Promise.all(
        params.summary.orderBy.map(async (userId) => {
          return getUserNameById(userId);
        })
      );

      setUsers(userNames);
    };

    getUserName();
  }, [params.summary.orderBy]);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <Image
              src={params.summary.foodImage}
              alt={params.summary.foodName}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>
          <div className="font-bold">{params.summary.foodName}</div>
          {users &&
            users.map((user) => (
              <div key={user} className="text-sm opacity-50">
                <div className="badge badge-ghost mb-1">{user}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SummaryFood;
