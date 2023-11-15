import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Order, User } from "@prisma/client";

import { getDateAsString } from "@/utils/dateUtils";
import { getUserById } from "@/actions/user";

type Props = {
  params: {
    order: Order;
  };
};

const OrderName = ({ params }: Props) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUserById(params.order.userId).then((user) => setUser(user));
  }, [params.order.userId]);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <Image
              src={
                user?.imageUrl ||
                "https://www.svgrepo.com/show/452030/avatar-default.svg"
              }
              alt={user?.lastName || "avatar"}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>
          <div className="font-bold">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-sm opacity-50">
            {getDateAsString(params.order.createdAt)}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderName;
