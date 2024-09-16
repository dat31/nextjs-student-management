import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#ffffff] py-20">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4">
        <p className="font-bold mb-12 lg:mb-0 text-2xl col-span-2 lg:col-span-1">
          Da Nang <br className="hidden lg:block" /> Real Estate
        </p>
        <div>
          <p className="font-bold  text-sm lg:text-base mb-4">
            BUY, RENT AND SELL
          </p>
          <Link
            className="text-sm lg:text-base font-medium leading-9"
            href={"/property"}
          >
            <p>Buy and sell properties</p>
          </Link>
          <Link
            className="text-sm lg:text-base font-medium leading-9"
            href={"/property"}
          >
            <p>Rent home</p>
          </Link>
        </div>
        <div>
          <p className="font-bold lg:text-base mb-4 text-sm">BUY A HOME</p>
          <Link
            className="text-sm lg:text-base font-medium leading-9"
            href={"/property"}
          >
            <p>Buy</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
