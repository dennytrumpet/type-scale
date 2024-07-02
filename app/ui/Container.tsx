import React from "react";
import { tv } from "tailwind-variants";
import { WrapperProps } from "@/lib/utils";

const Container = ({ children, className }: WrapperProps) => {
  const containerClasses = tv({
    base: "container mx-auto flex flex-col relative",
  });
  return <div className={containerClasses({ className })}>{children}</div>;
};

export default Container;
