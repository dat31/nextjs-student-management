"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { upload } from "./s3";
import sharp from "sharp";
import prisma from "./prisma";
import { ICreateProperty } from "./schemas";
import { PropertyType } from "@prisma/client";

export async function createProperty({
  imageUrl,
  contentUrl,
  noBathrooms,
  noBeds,
  price,
  width,
  height,
  ...data
}: ICreateProperty) {
  let propertyId;
  try {
    const session = await auth();
    const uuid = uuidv4();

    const imageFile: File = imageUrl as unknown as File;
    const imageFileName = `${uuid}.${imageFile.type.split("/")[1]}`;
    const thumbnailFileName = `${uuid}.webp`;
    const mdxFileName = `${uuid}.mdx`;
    const imageBuffer = await imageFile.arrayBuffer();
    const mdx = Buffer.from(contentUrl as string, "utf8");

    const thumbnailBuffer = await sharp(imageBuffer)
      .resize(360)
      .webp()
      .toBuffer();

    await Promise.all([
      upload(imageFileName, imageBuffer),
      upload(mdxFileName, mdx),
      upload(thumbnailFileName, thumbnailBuffer),
    ]);

    const { id } = await prisma.property.create({
      data: {
        ...data,
        noBeds: Number(noBeds),
        noBathrooms: Number(noBathrooms),
        width: Number(width),
        height: Number(height),
        price: Number(price),
        type: data.type as PropertyType,
        imageUrl: imageFileName,
        contentUrl: mdxFileName,
        thumbnailUrl: thumbnailFileName,
        creator: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });
    propertyId = id;
  } catch (error) {
    console.log(error);
    return {
      message: "Database error",
    };
  }
  redirect(`/property/${propertyId}`);
}

export async function browserMoreProperties(form: FormData) {
  const params = new URLSearchParams();
  params.set("address", form.get("address") as string);
  redirect(`/property?${params.toString()}`);
}
