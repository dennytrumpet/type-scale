"use client";
import { ChevronDown } from "lucide-react";
import React from "react";
import {
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  Button,
  ListBox,
  ListBoxItemProps,
  SelectValue,
  ValidationResult
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { DropdownItem, DropdownSection, DropdownSectionProps } from "./ListBox";
import { Popover } from "./Popover";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

const styles = tv({
  extend: focusRing,
  base: "flex w-full min-w-[150px] cursor-default items-center gap-4 rounded-lg border border-zinc-950/10 bg-zinc-100 py-2 pl-3 pr-2 text-start transition dark:border-zinc-100/10 dark:bg-zinc-950 dark:shadow-none",
  variants: {
    isDisabled: {
      false:
        "pressed:bg-zinc-200 dark:pressed:bg-zinc-800 text-zinc-800 hover:bg-zinc-100/90 group-invalid:border-red-600 dark:text-zinc-300 dark:hover:bg-zinc-950/90",
      true: "text-zinc-200 dark:border-zinc-100/5 dark:bg-zinc-800 dark:text-zinc-600"
    }
  }
});

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-1"
      )}
    >
      {label && <Label>{label}</Label>}
      <Button className={styles}>
        <SelectValue className="flex-1 text-sm placeholder-shown:italic" />
        <ChevronDown
          aria-hidden
          className="h-4 w-4 text-zinc-600 group-disabled:text-zinc-200 dark:text-zinc-400 dark:group-disabled:text-zinc-600"
        />
      </Button>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="min-w-[--trigger-width]">
        <ListBox
          items={items}
          className="max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return <DropdownSection {...props} />;
}
