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
import { composeTailwindRenderProps, focusRing } from "./utils";

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
  base: "relative flex gap-3 cursor-default select-none py-2 px-3 text-sm text-zinc-900 dark:text-zinc-200 border-y dark:border-y-zinc-700 border-transparent first:border-t-0 last:border-b-0 first:rounded-t-md last:rounded-b-md -mb-px last:mb-0 -outline-offset-2",
  variants: {
    isSelected: {
      false: "hover:bg-zinc-100 dark:hover:bg-zinc-700/60",
      true: "bg-zinc-100 dark:bg-zinc-700/30 hover:bg-zinc-200 dark:hover:bg-zinc-700/40 border-y-zinc-200 dark:border-y-zinc-900 z-20"
    },
    isDisabled: {
      true: "text-slate-300 dark:text-zinc-600 z-10"
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
