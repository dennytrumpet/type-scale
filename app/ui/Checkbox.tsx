import { Check, Minus } from "lucide-react";
import React, { ReactNode } from "react";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps,
  ValidationResult,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

export interface CheckboxGroupProps
  extends Omit<AriaCheckboxGroupProps, "children"> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-2"
      )}
    >
      <Label>{props.label}</Label>
      {props.children}
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}

const checkboxStyles = tv({
  base: "group flex items-center gap-2 text-sm transition",
  variants: {
    isDisabled: {
      false: "text-zinc-800 dark:text-zinc-200",
      true: "text-zinc-300 dark:text-zinc-600"
    }
  }
});

const boxStyles = tv({
  extend: focusRing,
  base: "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition",
  variants: {
    isSelected: {
      false:
        "dark:[--color:colors.zinc-400)] group-pressed:[--color:theme(colors.gray.500)] dark:group-pressed:[--color:theme(colors.zinc.300)] border-[--color] bg-zinc-100 [--color:theme(colors.gray.400)] dark:bg-zinc-950",
      true: "group-pressed:[--color:theme(colors.gray.800)] dark:group-pressed:[--color:theme(colors.slate.200)] border-[--color] bg-[--color] [--color:theme(colors.gray.700)] dark:[--color:theme(colors.slate.300)]"
    },
    isInvalid: {
      true: "group-pressed:[--color:theme(colors.red.800)] dark:group-pressed:[--color:theme(colors.red.700)] [--color:theme(colors.red.700)] dark:[--color:theme(colors.red.600)]"
    },
    isDisabled: {
      true: "[--color:theme(colors.gray.200)] dark:[--color:theme(colors.zinc.700)]"
    }
  }
});

const iconStyles =
  "w-4 h-4 text-zinc-100 group-disabled:text-zinc-400 dark:text-slate-900 dark:group-disabled:text-slate-600";

export function Checkbox(props: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className })
      )}
    >
      {({ isSelected, isIndeterminate, ...renderProps }) => (
        <>
          <div
            className={boxStyles({
              isSelected: isSelected || isIndeterminate,
              ...renderProps
            })}
          >
            {isIndeterminate ? (
              <Minus aria-hidden className={iconStyles} />
            ) : isSelected ? (
              <Check aria-hidden className={iconStyles} />
            ) : null}
          </div>
          {props.children}
        </>
      )}
    </AriaCheckbox>
  );
}
