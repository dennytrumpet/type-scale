import { ArrowUp } from "lucide-react";
import React from "react";
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Button,
  CellProps,
  Collection,
  ColumnProps,
  ColumnResizer,
  Group,
  ResizableTableContainer,
  RowProps,
  TableHeaderProps,
  TableProps,
  composeRenderProps,
  useTableOptions
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

export function Table(props: TableProps) {
  return (
    <ResizableTableContainer className="relative max-h-[280px] w-[550px] scroll-pt-[2.281rem] overflow-auto rounded-lg border dark:border-zinc-600">
      <AriaTable {...props} className="border-separate border-spacing-0" />
    </ResizableTableContainer>
  );
}

const columnStyles = tv({
  extend: focusRing,
  base: "flex h-5 flex-1 items-center gap-1 overflow-hidden px-2"
});

const resizerStyles = tv({
  extend: focusRing,
  base: "resizing:bg-zinc-600 resizing:w-[2px] resizing:pl-[7px] box-content h-5 w-px translate-x-[8px] cursor-col-resize rounded bg-zinc-400 bg-clip-content px-[8px] py-1 -outline-offset-2 dark:bg-zinc-500"
});

export function Column(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "cursor-default text-start text-sm font-semibold text-zinc-700 dark:text-zinc-300 [&:focus-within]:z-20 [&:hover]:z-20"
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { allowsSorting, sortDirection }) => (
          <div className="flex items-center">
            <Group role="presentation" tabIndex={-1} className={columnStyles}>
              <span className="truncate">{children}</span>
              {allowsSorting && (
                <span
                  className={`flex h-4 w-4 items-center justify-center transition ${
                    sortDirection === "descending" ? "rotate-180" : ""
                  }`}
                >
                  {sortDirection && (
                    <ArrowUp
                      aria-hidden
                      className="h-4 w-4 text-zinc-600 dark:text-zinc-400"
                    />
                  )}
                </span>
              )}
            </Group>
            {!props.width && <ColumnResizer className={resizerStyles} />}
          </div>
        )
      )}
    </AriaColumn>
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  return (
    <AriaTableHeader
      {...props}
      className={twMerge(
        "sticky top-0 z-10 rounded-t-lg border-b bg-zinc-100/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-zinc-100 dark:border-b-zinc-700 dark:bg-zinc-700/60 dark:supports-[-moz-appearance:none]:bg-zinc-700",
        props.className
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === "toggle" && (
        <AriaColumn
          width={36}
          minWidth={36}
          className="cursor-default p-2 text-start text-sm font-semibold"
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={props.columns}>{props.children}</Collection>
    </AriaTableHeader>
  );
}

const rowStyles = tv({
  extend: focusRing,
  base: "group/row selected:bg-zinc-100 selected:hover:bg-zinc-200 dark:selected:bg-zinc-700/30 dark:selected:hover:bg-zinc-700/40 relative cursor-default select-none text-sm text-zinc-900 -outline-offset-2 hover:bg-zinc-100 disabled:text-zinc-300 dark:text-zinc-200 dark:hover:bg-zinc-700/60 dark:disabled:text-zinc-600"
});

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  let { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

const cellStyles = tv({
  extend: focusRing,
  base: "group-selected/row:border-[--selected-border] truncate border-b p-2 -outline-offset-2 [--selected-border:theme(colors.blue.200)] group-last/row:border-b-0 dark:border-b-zinc-700 dark:[--selected-border:theme(colors.blue.900)] [:has(+[data-selected])_&]:border-[--selected-border]"
});

export function Cell(props: CellProps) {
  return <AriaCell {...props} className={cellStyles} />;
}
