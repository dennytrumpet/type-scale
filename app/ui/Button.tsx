"use client";
import React from "react";
import {
  composeRenderProps,
  Button as _Button,
  ButtonProps as _ButtonProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/lib/utils";

export interface ButtonProps extends _ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "icon";
}

let button = tv({
  extend: focusRing,
  base: "px-4 py-2 text-sm text-center transition rounded-md cursor-default no-underline transition-all inline-flex items-center gap-2",
  variants: {
    variant: {
      primary: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300",
      secondary: "bg-zinc-800 text-zinc-50 hover:bg-zinc-900",
      icon: ""
    },
    isDisabled: {
      true: ""
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

export const buttonVariants = ({ className, variant }: ButtonProps) =>
  composeRenderProps(className, (className, renderProps) =>
    button({ ...renderProps, variant, className })
  );

export default function Button(props: ButtonProps) {
  return (
    <_Button
      {...props}
      className={buttonVariants({
        className: props.className,
        variant: props.variant
      })}
    />
  );
}
