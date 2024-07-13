import React, { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { WrapperProps } from "@/app/ui/utils";

const Prose = forwardRef(
  (
    { children, className }: WrapperProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const proseClasses = tv({
      base: "relative mx-auto w-full max-w-prose text-pretty text-left text-base *:transition-all *:duration-300 *:ease-in-out first:*:mt-0 last:*:mb-0"
    });
    return (
      <div className={proseClasses({ className })} ref={ref}>
        {children}
      </div>
    );
  }
);

Prose.displayName = "Prose";

export default Prose;
