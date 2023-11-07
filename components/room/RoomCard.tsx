import Image from "next/image";
import { User } from "@clerk/nextjs/server";

import { getDateAsString } from "@/utils/dateUtils";

import Button from "@/components/ui/neo-brutalism/Button";
import Link from "next/link";
import Badge from "../ui/neo-brutalism/Badge";
import Avatar from "../ui/neo-brutalism/Avatar";

type Props = {
  roomId: string;
  user: User;
  date: Date;
  title: string;
  imageSrc: string;
  description: string;
};

export default function Card({
  roomId,
  user,
  date,
  title,
  imageSrc,
  description,
}: Props) {
  return (
    <div className="w-[500px] h-full border-black border-2 rounded-md hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white">
      <a href={`/room/${roomId}`} className="block cursor-pointer">
        <article className="w-full h-full">
          <figure className="w-full h-1/2 border-black border-b-2">
            <Image
              src={imageSrc}
              alt="thumbnail"
              className="w-full h-full object-cover"
              width={560}
              height={560}
            />
          </figure>
          <div className="flex flex-wrap justify-center px-6 py-5 h-full">
            <div className="flex flex-wrap justify-center mb-2">
              <Avatar imageUrl={user.imageUrl} />
            </div>
            <p className="text-base text-center mb-4 w-full">
              {getDateAsString(date)}
            </p>

            <h1 className="text-[32px] mb-4 text-center">{title}</h1>
            <p className="text-xs mb-4 line-clamp-4">{description}</p>
            <Link href={`/room/${roomId}`}>
              <Button>Join</Button>
            </Link>
          </div>
        </article>
      </a>
    </div>
  );
}
