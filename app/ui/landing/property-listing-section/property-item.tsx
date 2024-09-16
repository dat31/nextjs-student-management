import { Property } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import "./property-item.css";

export default function PropertyItem({
  thumbnailUrl,
  price,
  id,
  width,
  height,
  noBathrooms,
  noBeds,
  name,
  address,
}: Property) {
  return (
    <Link href={`/property/${id}`} legacyBehavior>
      <article className="bg-card cursor-pointer">
        <div className="w-full h-50 relative">
          <Image
            loading="lazy"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw"
            className="object-cover"
            fill
            src={thumbnailUrl}
            alt={name}
          />
        </div>

        <div className="py-8 px-6">
          <span className="font-extrabold text-2xl leading-[150%] mr-1">
            {price.toString()}
          </span>
          <span className="font-medium leading-[150%]">/month</span>
          <p className="mb-2 font-bold text-2xl leading-[150%] line-clamp-1">
            {name}
          </p>
          <p className="mb-4 line-clamp-1">{address}</p>
          <hr className="mb-4" />
          <div className="flex gap-4">
            <span>
              <span>{noBeds} Beds</span>
            </span>
            <span className="hidden lg:block">
              <span>{noBathrooms} Bathrooms</span>
            </span>
            <span>
              <span>{`${width}x${height}`} m²</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

//  <Link href={`/property/${id}`}>
