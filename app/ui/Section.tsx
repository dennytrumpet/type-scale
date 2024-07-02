import React from "react";
import { tv } from "tailwind-variants";
import { WrapperProps } from "@/lib/utils";

const Section = ({ children, className, id }: WrapperProps) => {
  const sectionClasses = tv({
    base: "relative isolate px-4 py-3 sm:px-8 sm:py-6 md:px-16 md:py-12",
  });
  return (
    <section id={id} className={sectionClasses({ className })}>
      {children}
    </section>
  );
};

export default Section;
