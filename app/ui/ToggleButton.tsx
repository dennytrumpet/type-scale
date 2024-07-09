import React from "react";
import {
  ToggleButton as RACToggleButton,
  ToggleButtonProps,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

let styles = tv({
  extend: focusRing,
  base: "px-5 py-2 text-sm text-center transition rounded-lg border border-zinc-950/10 dark:border-zinc-100/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default",
  variants: {
    isSelected: {
      false:
        "bg-zinc-100 hover:bg-zinc-200 pressed:bg-zinc-300 text-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400 dark:text-zinc-100",
      true: "bg-zinc-700 hover:bg-zinc-800 pressed:bg-zinc-900 text-zinc-100 dark:bg-slate-300 dark:hover:bg-slate-200 dark:pressed:bg-slate-100 dark:text-zinc-950"
    },
    isDisabled: {
      true: "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 border-zinc-950/5 dark:border-zinc-100/5"
    }
  }
});

export function ToggleButton(props: ToggleButtonProps) {
  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className })
      )}
    />
  );
}
