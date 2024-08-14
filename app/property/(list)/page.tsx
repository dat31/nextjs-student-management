import { PropertyItem } from "@/app/ui/landing/property-listing-section/property-list";
import Filter from "@/app/ui/property/filter";
import { Prisma, Property } from "@prisma/client";
import Layout from "@/app/ui/layout";
import prisma, { getAllProperty } from "../../lib/prisma";
import Image from "next/image";
import { RECORDS_PER_PAGE } from "../../lib/constants";
import { Metadata } from "next";
import Pagination from "@/app/ui/pagination";

export default async function PropertyPage({
  searchParams,
}: {
  searchParams: Partial<Property & { from: number; to: number; page?: number }>;
}) {
  const {
    from,
    to,
    address,
    name,
    noBathrooms,
    noBeds,
    page = 1,
    type,
  } = searchParams;

  const findManyArgs: Prisma.PropertyFindManyArgs = {
    take: RECORDS_PER_PAGE,
    skip: (page - 1) * RECORDS_PER_PAGE,
    where: {
      type: {
        ...(type ? { equals: type } : {}),
      },
      price: {
        ...(from ? { gte: Number(from) } : {}),
        ...(to ? { lte: Number(to) } : {}),
      },
      address: {
        contains: address,
        mode: "insensitive",
      },
      name: {
        contains: name,
      },
      noBathrooms: {
        ...(noBathrooms ? { lte: Number(noBathrooms) } : {}),
      },
      noBeds: {
        ...(noBeds ? { lte: Number(noBeds) } : {}),
      },
    },
  };

  const [properties, totalPages] = await Promise.all([
    getAllProperty(findManyArgs),
    prisma.property
      .count({
        where: findManyArgs.where,
      })
      .then((count) => Math.ceil(count / RECORDS_PER_PAGE)),
  ]);

  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-primary-light-3 screen-height">
      <Layout>
        <Filter />
        <div className="grid-cols-1 gap-x-6 gap-y-8 grid md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyItem {...property} key={property.id} />
          ))}
        </div>
        {properties.length === 0 ? (
          <div className="h-full flex flex-col gap-12 items-center justify-center">
            <Image
              src={"/assets/house_full.svg"}
              width={500}
              height={400}
              alt="Empty"
            />
            <p className="text-xl">No result matches the filter</p>
          </div>
        ) : null}
        {totalPages > 1 ? (
          <Pagination totalPages={totalPages} currentPage={Number(page)} />
        ) : null}
      </Layout>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Search property",
  };
}
