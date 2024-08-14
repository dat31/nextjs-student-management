import { Prisma, PrismaClient } from "@prisma/client";
import { getSignedUrl } from "./s3";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export async function getAllProperty(
  findManyArgs: Prisma.PropertyFindManyArgs
) {
  const response = await prisma.property.findMany(findManyArgs);

  return Promise.all(
    response.map((property) =>
      getSignedUrl(property.thumbnailUrl).then((thumbnailUrl) => ({
        ...property,
        thumbnailUrl,
      }))
    )
  );
}
