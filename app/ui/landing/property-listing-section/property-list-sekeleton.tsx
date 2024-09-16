import PropertyListMobile from "./property-listing-mobile";
import "./property-item.css";

export default function PropertyListSkeleton() {
  return (
    <>
      <div className="grid-cols-3 gap-x-6 gap-y-8 hidden lg:grid">
        {Array.from(new Array(6).keys()).map((index) => (
          <PropertyItemSkeleton key={index} />
        ))}
      </div>
      <PropertyListMobile>
        {Array.from(new Array(6).keys()).map((index) => (
          <PropertyItemSkeleton key={index} />
        ))}
      </PropertyListMobile>
    </>
  );
}

function PropertyItemSkeleton() {
  return (
    <article
      className={
        "bg-[#ffffff] dark:bg-neutral-50 skeleton rounded-none property-item"
      }
    >
      <div className="w-full h-50 bg-primary-light-3 flex justify-center items-center">
        <svg
          className="w-10 h-10 bg-primary-light-3 text-primary-light-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            fill="#F7F7FD"
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
      </div>

      <div className="py-8 px-6 animate-pulse">
        <div className="w-36 h-8 mb-2 bg-primary-light-3"></div>
        <div className="w-36 h-9 mb-2 bg-primary-light-3"></div>
        <div className="w-full h-6 bg-primary-light-3 mb-4"></div>
        <hr className="mb-4" />
        <div className="flex gap-4">
          <div className="w-12 h-5 bg-primary-light-3"></div>
          <div className="w-12 h-5 bg-primary-light-3"></div>
          <div className="w-12 h-5 bg-primary-light-3"></div>
        </div>
      </div>
    </article>
  );
}
