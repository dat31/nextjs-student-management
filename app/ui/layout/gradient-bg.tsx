import { PropsWithChildren } from "react";

export default function GradientBg({ children }: PropsWithChildren) {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-primary-light-3">
      {children}
    </div>
  );
}
