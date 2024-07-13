import React from "react";
import {
  ToggleButton as RACToggleButton,
  ToggleButtonProps,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/app/ui/utils";

let styles = tv({
  extend: focusRing,
  base: "cursor-default rounded-lg border border-zinc-950/10 px-5 py-2 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-zinc-100/10 dark:shadow-none",
  variants: {
    isSelected: {
      false:
        "pressed:bg-zinc-300 dark:pressed:bg-zinc-400 bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-500",
      true: "pressed:bg-zinc-900 dark:pressed:bg-slate-100 bg-zinc-700 text-zinc-100 hover:bg-zinc-800 dark:bg-slate-300 dark:text-zinc-950 dark:hover:bg-slate-200"
    },
    isDisabled: {
      true: "border-zinc-950/5 bg-zinc-100 text-zinc-300 dark:border-zinc-100/5 dark:bg-zinc-800 dark:text-zinc-600"
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
