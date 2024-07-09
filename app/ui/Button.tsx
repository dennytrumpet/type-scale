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
  base: "px-4 py-2 text-sm text-center transition rounded-md cursor-default no-underline transition-all inline-flex items-center gap-2 border borer-solid ring-0 forced-color-adjust-none",
  variants: {
    variant: {
      primary:
        "bg-zinc-100 text-zinc-950 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:text-zinc-100 border-zinc-950/10 dark:border-zinc-100/10",
      secondary:
        "bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 hover:bg-zinc-300 hover:dark:bg-zinc-900 border-zinc-950/10 dark:border-zinc-100/10"
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed"
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
