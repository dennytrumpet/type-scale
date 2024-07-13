"use client";
import React from "react";
import {
  composeRenderProps,
  Button as _Button,
  ButtonProps as _ButtonProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/app/ui/utils";

export interface ButtonProps extends _ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "accent"
    | "destructive"
    | "icon";
}

export const button = tv({
  extend: focusRing,
  base: "borer-solid inline-flex cursor-default items-center gap-2 rounded-md border px-4 py-2 text-center text-sm no-underline ring-0 transition transition-all forced-color-adjust-none",
  variants: {
    variant: {
      primary:
        "border-zinc-950/10 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 dark:border-zinc-100/10 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900",
      secondary:
        "border-zinc-950/10 bg-zinc-200 text-zinc-950 hover:bg-zinc-300 dark:border-zinc-100/10 dark:bg-zinc-800 dark:text-zinc-100 hover:dark:bg-zinc-900",
      accent:
        "border-zinc-950/10 bg-zinc-400 text-zinc-950 hover:bg-zinc-500 dark:border-zinc-100/10 dark:bg-zinc-600 dark:text-zinc-100 hover:dark:bg-zinc-700",
      danger: "",
      destructive: "",
      icon: "p-2"
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-50"
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
