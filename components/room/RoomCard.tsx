import Image from "next/image";
import React from "react";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";
import { getDateAsString } from "@/utils/dateUtils";

type Props = {
  params: {
    roomId: string;
    user: User;
    date: Date;
    title: string;
    imageSrc: string;
    description: string;
  };
};

const RoomCard = ({ params }: Props) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src={params.imageSrc}
          alt={params.title}
          width={560}
          height={560}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="line-clamp-1">{params.title}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">
            {getDateAsString(params.date)}
          </div>
          <div className="badge badge-outline">{params.user.lastName}</div>
        </div>
      </div>
      <div className="flex justify-center items-center pb-2">
        <Link href={`/room/${params.roomId}`}>
          <button className="btn btn-primary">Join</button>
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
