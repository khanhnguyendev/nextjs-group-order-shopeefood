import Image from "next/image";
import React from "react";
import { Menu } from "@prisma/client";

import { getImgSrc } from "@/utils/utils";
import AddToCard from "@/components/room/order/AddToCard";

type Props = {
  params: {
    menu: Menu;
    roomId: string;
  };
};

const FoodCard = ({ params }: Props) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={getImgSrc(params.menu.photos)}
          alt={params.menu.name}
          width={560}
          height={560}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {params.menu.name}
          <div className="badge badge-secondary">{params.menu.totalLike}</div>
        </h2>
        <p>{params.menu.description ?? ""}</p>
        <div className="card-actions justify-end">
          {/* <div className="badge badge-outline">{params.menu.displayOrder}</div> */}
        </div>
        <div className="card-actions justify-end">
          <AddToCard params={{ dish: params.menu, roomId: params.roomId }} />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
