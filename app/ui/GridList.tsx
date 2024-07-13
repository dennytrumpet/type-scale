import React from "react";
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button,
  GridListItemProps,
  GridListProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

export function GridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "relative overflow-auto rounded-lg border dark:border-zinc-600"
      )}
    >
      {children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: "relative -mb-px flex cursor-default select-none gap-3 border-y border-transparent px-3 py-2 text-sm text-zinc-900 -outline-offset-2 first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 dark:border-y-zinc-700 dark:text-zinc-200",
  variants: {
    isSelected: {
      false: "hover:bg-zinc-100 dark:hover:bg-zinc-700/60",
      true: "z-20 border-y-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:border-y-zinc-900 dark:bg-zinc-700/30 dark:hover:bg-zinc-700/40"
    },
    isDisabled: {
      true: "z-10 text-slate-300 dark:text-zinc-600"
    }
  }
});

export function GridListItem({ children, ...props }: GridListItemProps) {
  let textValue = typeof children === "string" ? children : undefined;
  return (
    <AriaGridListItem textValue={textValue} {...props} className={itemStyles}>
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === "multiple" && selectionBehavior === "toggle" && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </AriaGridListItem>
  );
}
