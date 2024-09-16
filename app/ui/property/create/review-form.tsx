"use client";

import { Prisma, Property, User } from "@prisma/client";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bed,
  Bath,
  Maximize2,
  Zap,
  Droplet,
  DollarSign,
  MapPin,
  Car,
  PawPrint,
  UserIcon,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { formatCurrency } from "@/app/lib/utils";
export default function ReviewForm({
  property,
  creator,
}: {
  property: Property;
  creator: User;
}) {
  const {
    name,
    address,
    noBathrooms,
    noBeds,
    price,
    width,
    height,
    contentUrl,
    petFriendly,
    electricCharge,
    internetCharge,
    waterCharge,
    parkingSlots,
  } = property;
  const { name: creatorName, image } = creator || {};
  const [mdx, setMdx] = useState<MDXRemoteProps>();

  useEffect(() => {
    if (contentUrl) {
      serialize(contentUrl).then(setMdx);
    }
  }, [contentUrl]);

  return (
    <div className="col-span-6">
      <div className="overflow-hidden mb-8">
        <div className="relative aspect-video mb-4 bg-border">
          {property.imageUrl && (
            <Image
              fill
              priority
              src={URL.createObjectURL(property.imageUrl as unknown as Blob)}
              alt="Property"
              objectFit="cover"
              className="rounded-t-lg"
            />
          )}
        </div>
        <div className="">
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{address}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Maximize2 className="mr-2 h-4 w-4" />
              <span>
                {width} x {height} sq ft
              </span>
            </div>
            <div className="flex items-center">
              <Bed className="mr-2 h-4 w-4" />
              <span>{noBeds} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 h-4 w-4" />
              <span>{noBathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>{price ? formatCurrency(price as any) : ""}</span>
            </div>
            <div className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              <span>{renderCharge(electricCharge)}</span>
            </div>
            <div className="flex items-center">
              <Droplet className="mr-2 h-4 w-4" />
              <span>{renderCharge(waterCharge)}</span>
            </div>
            <div className="flex items-center">
              <Wifi className="mr-2 h-4 w-4" />
              <span>{renderCharge(internetCharge)}</span>
            </div>
            {parkingSlots && (
              <div className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                <span>{parkingSlots} parking slot</span>
              </div>
            )}
            {petFriendly && (
              <div className="flex items-center">
                <PawPrint className="mr-2 h-4 w-4" />
                <span>pet-friendly</span>
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
          </div>
        </div>
      </div>
      <div className="my-8">
        {mdx && (
          <div className="prose min-w-full">
            <MDXRemote {...mdx} />
          </div>
        )}
      </div>
    </div>
  );
}

function renderCharge(value: Prisma.Decimal) {
  if (!value) {
    return "Free";
  }
  return value.toString() !== "0" ? `$${value.toString()}/mo` : "Free";
}
