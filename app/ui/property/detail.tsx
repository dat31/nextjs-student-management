import Image from "next/image";
import { Prisma, Property, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bed,
  Bath,
  Maximize2,
  UserIcon,
  Zap,
  Droplet,
  DollarSign,
  MapPin,
  Car,
  PawPrint,
  Wifi,
} from "lucide-react";
import { ReactNode } from "react";
import { Article } from "./article";
import { MDXRemoteProps } from "next-mdx-remote";

type Props = {
  property: Property & { creator: User };
  children?: ReactNode;
  imageUrl: string;
  mdx: MDXRemoteProps;
};

export default function PropertyDetail({
  property,
  children,
  imageUrl,
  mdx,
}: Props) {
  const {
    name,
    address,
    noBathrooms,
    noBeds,
    price,
    width,
    height,
    // createdAt,
    // updatedAt,
    petFriendly,
    parkingSlots,
    internetCharge,
    waterCharge,
    electricCharge,
    creator: { name: creatorName, image },
  } = property;
  return (
    <>
      <div className="overflow-hidden">
        <div className="relative aspect-video mb-4">
          {imageUrl && (
            <Image
              fill
              priority
              src={imageUrl}
              alt="Property"
              className="object-cover"
            />
          )}
        </div>
        <div className="my-4">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <div className="flex items-center text-gray-600 mb-8">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{address}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="flex items-center">
              <Maximize2 className="mr-2 h-4 w-4" />
              <span>
                <span className="font-bold text-xl">{width}</span> x
                <span className="font-bold text-xl">{height}</span> sq ft
              </span>
            </div>
            <div className="flex items-center">
              <Bed className="mr-2 h-4 w-4" />
              <span>
                <span className="font-bold text-xl">{noBeds}</span> Beds
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 h-4 w-4" />
              <span>
                <span className="font-bold text-xl">{noBathrooms}</span> Baths
              </span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              <span className="font-bold text-xl">{price?.toString()}</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              <span className="font-bold text-xl">
                {renderCharge(electricCharge)}
              </span>
            </div>
            <div className="flex items-center">
              <Droplet className="mr-2 h-4 w-4" />
              <span className="font-bold text-xl">
                {renderCharge(waterCharge)}
              </span>
            </div>
            <div className="flex items-center">
              <Wifi className="mr-2 h-4 w-4" />
              <span className="font-bold text-xl">
                {renderCharge(internetCharge)}
              </span>
            </div>
            {parkingSlots && (
              <div className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                <span>
                  <span className="font-bold text-xl">{parkingSlots}</span>{" "}
                  parking slot(s)
                </span>
              </div>
            )}
            {petFriendly && (
              <div className="flex items-center">
                <PawPrint className="mr-2 h-4 w-4" />
                <span>Pet-friendly</span>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage
                  src={image as string}
                  alt={creatorName as string}
                />
                <AvatarFallback>
                  <UserIcon className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Listed by</p>
                <p className="text-gray-600">{creatorName}</p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      {mdx && <Article {...mdx} />}
    </>
  );
}

function renderCharge(value: string | Prisma.Decimal): string {
  if (!value?.toString) {
    return (value || "Free") as string;
  }

  return value?.toString() !== "0" ? `$${value?.toString()}` : "Free";
}
