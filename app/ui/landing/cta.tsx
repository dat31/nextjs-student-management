export default function CTA() {
  return (
    <section className=" bg-white dark:bg-neutral-50 dark:text-[#112A46]">
      <div className="pt-16 pb-20 flex items-center flex-col container mx-auto ">
        <p className="mb-2 font-bold text-2xl text-primary dark:text-[#112A46]">
          No Spam Promise
        </p>
        <p className="text-4.5xl font-bold leading-[140%] mb-4">
          Are you a landlord?
        </p>
        <p className="font-medium text-base leading-[160%] mb-8">
          {
            "Discover ways to increase your home's value and get listed. No Spam."
          }
        </p>
        <div className="flex flex-col sm:flex-row items-center mb-6 w-full md:w-[543px] sm:gap-6 gap-4 py-4 sm:bg-[#ffffff] sm:dark:bg-neutral-200 px-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-white sm:w-auto h-14 sm:h-auto font-medium text-0.5xl leading-[145%] track-[-0.5px] grow border-none sm:bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
          />
          <button
            aria-label="Submit"
            className="bg-primary text-[#ffffff] px-10 py-3 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
        <span className="font-medium text-sm leading-[140%]">
          Join <span className="text-primary">10,000+</span> other landlords in
          our estatery community.
        </span>
      </div>
    </section>
  );
}
