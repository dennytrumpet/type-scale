import { Check } from "lucide-react";
import React from "react";
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxProps as AriaListBoxProps,
  Collection,
  Header,
  ListBoxItemProps,
  Section,
  SectionProps,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

interface ListBoxProps<T>
  extends Omit<AriaListBoxProps<T>, "layout" | "orientation"> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "rounded-lg border border-zinc-950/10 p-1 outline-0 dark:border-zinc-100/10"
      )}
    >
      {children}
    </AriaListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base: "group relative flex cursor-default select-none items-center gap-8 rounded-md px-2.5 py-1.5 text-sm will-change-transform",
  variants: {
    isSelected: {
      false:
        "text-slate-600 -outline-offset-2 hover:bg-slate-200 dark:text-zinc-400 dark:hover:bg-zinc-800",
      true: "bg-zinc-200 text-zinc-100 -outline-offset-4 outline-zinc-100 dark:outline-zinc-100 [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none"
    },
    isDisabled: {
      true: "text-slate-300 dark:text-zinc-700"
    }
  }
});

export function ListBoxItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, children => (
        <>
          {children}
          <div className="absolute bottom-0 left-4 right-4 hidden h-px bg-zinc-100 [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base: "group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pl-3 pr-1 text-sm outline outline-0",
  variants: {
    isDisabled: {
      false: "text-zinc-900 dark:text-zinc-100",
      true: "text-zinc-300 dark:text-zinc-600"
    },
    isFocused: {
      true: "bg-zinc-200 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
    }
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: "bg-zinc-100 dark:bg-zinc-700/60"
    }
  ]
});

export function DropdownItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <Check className="h-4 w-4" />}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return (
    <Section className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
      <Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y bg-zinc-100/60 px-4 py-1 text-sm font-semibold text-zinc-500 backdrop-blur-md supports-[-moz-appearance:none]:bg-zinc-100 dark:border-y-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </Section>
  );
}
