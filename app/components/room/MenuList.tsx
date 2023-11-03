import React from "react";

import prisma from "@libs/prismadb";
import Image from "next/image";

interface ServerSidebarProps {
  roomId: string;
}

export default async function MenuList({ roomId }: ServerSidebarProps) {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });

  const menu = await prisma.menu.findMany({
    where: {
      restaurantId: room?.restaurantId,
      deliveryId: room?.deliveryId,
    },
  });

  const getImgSrc = (photos: any) => {
    const photo = photos.find((photo: any) => photo.width === 560);
    if (photo) {
      return photo.value;
    }
    return photos[0].value;
  };

  return (
    <>
      {menu.map((dish) => (
        <div
          key={dish.id}
          className="w-80 h-full border-black border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white"
        >
          <a className="block cursor-pointer">
            <article className="w-full h-full">
              <figure className="w-full h-1/2 border-black border-b-2">
                <Image
                  src={getImgSrc(dish.photos)}
                  alt="thumbnail"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="px-6 py-5 text-left h-full">
                <p className="text-base mb-4">{dish.totalLike}</p>
                <h1 className="text-[32px] mb-4">{dish.name}</h1>
                <p className="text-xs mb-4 line-clamp-4">{dish.description}</p>
                <button className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-md">
                  {dish.price}
                </button>
              </div>
            </article>
          </a>
        </div>
      ))}
    </>
  );
}
