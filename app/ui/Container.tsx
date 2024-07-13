import React from "react";
import { tv } from "tailwind-variants";
import { WrapperProps } from "@/app/ui/utils";

const Container = ({ children, className }: WrapperProps) => {
  const containerClasses = tv({
    base: "container relative mx-auto flex flex-col"
  });
  return <div className={containerClasses({ className })}>{children}</div>;
};

export default Container;
