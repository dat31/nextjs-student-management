import clsx from "clsx";

const steps = [
  {
    title: "Overview",
    detail: "Overview info",
  },
  {
    title: "Services/Charges",
    detail: "Services, charges",
  },
  {
    title: "Review",
    detail: "Review property",
  },
];

export default function Steps({
  activeStep,
  onStepClick,
}: {
  activeStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex items-start -ml-1 md:items-center mb-8 md:mb-12 w-full flex-col md:flex-row gap-6 md:gap-10">
      {steps.map((step, index) => (
        <StepItem
          onClick={onStepClick}
          key={step.title}
          index={index}
          {...step}
          isActive={activeStep === index}
        />
      ))}
    </div>
  );
}

function StepItem({
  index,
  title,
  detail,
  isActive,
  onClick,
}: {
  index: number;
  title: string;
  detail: string;
  isActive: boolean;
  onClick: (step: number) => void;
}) {
  return (
    <div
      onClick={() => onClick(index)}
      className={clsx(
        " flex items-center gap-4 cursor-pointer transition-all duration-200 ease-linear",
        isActive ? "text-primary " : "text-neutral-300 hover:text-neutral-400"
      )}
    >
      <div
        className={clsx(
          "rounded-full  p-2 text-[#ffffff]",
          isActive ? "bg-primary" : "bg-neutral-300 hover:bg-neutral-400"
        )}
      >
        <span className="flex  items-center justify-center w-8 h-8 text-2xl shrink-0 font-bold">
          {index + 1}
        </span>
      </div>
      <span>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-base">{detail}</p>
      </span>
    </div>
  );
}
