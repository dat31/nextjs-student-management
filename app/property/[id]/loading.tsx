import Layout from "@/app/ui/layout";

export default function Loading() {
  return (
    <Layout>
      <div className="skeleton rounded-none h-11 lg:h-12 xl:h-17  mb-4 w-[80%]" />
      <div className="skeleton rounded-none h-[1.75rem] w-[64%] mb-8" />
      <div className="w-full relative h-72 md:h-96 lg:h-136 mb-6 skeleton rounded-none " />
      <div className="flex gap-4 mb-12">
        <div className="w-16 h-16 skeleton rounded-none"></div>
        <div className="w-40 h-16 skeleton rounded-none"></div>
      </div>
      <div className="h-40 w-full skeleton rounded-none mb-12" />
      <div className="w-full h-56 skeleton rounded-none" />
    </Layout>
  );
}
