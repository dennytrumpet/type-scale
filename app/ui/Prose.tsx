import React from "react";
import { tv } from "tailwind-variants";
import { WrapperProps } from "@/lib/utils";

const Content = ({ children, className }: WrapperProps) => {
  const contentClasses = tv({
    base: "relative mx-auto max-w-prose text-pretty text-left *:transition-all *:duration-300 *:ease-in-out first:*:mt-0 last:*:mb-0 text-base w-full",
  });
  return <div className={contentClasses({ className })}>{children}</div>;
};

export default Content;
