import React, { ReactNode } from "react";
import {
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  RadioGroupProps as RACRadioGroupProps,
  RadioProps,
  ValidationResult
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

export interface RadioGroupProps extends Omit<RACRadioGroupProps, "children"> {
  label?: string;
  children?: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RACRadioGroup
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex flex-col gap-2"
      )}
    >
      <Label>{props.label}</Label>
      <div className="group-orientation-vertical:flex-col group-orientation-horizontal:gap-4 flex gap-2">
        {props.children}
      </div>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </RACRadioGroup>
  );
}

const styles = tv({
  extend: focusRing,
  base: "h-5 w-5 rounded-full border-2 bg-zinc-100 transition-all dark:bg-zinc-950",
  variants: {
    isSelected: {
      false:
        "group-pressed:border-zinc-500 dark:group-pressed:border-zinc-300 border-zinc-400 dark:border-zinc-400",
      true: "group-pressed:border-zinc-800 dark:group-pressed:border-slate-200 border-[7px] border-zinc-700 dark:border-slate-300"
    },
    isInvalid: {
      true: "group-pressed:border-red-800 dark:group-pressed:border-red-700 border-red-700 dark:border-red-600"
    },
    isDisabled: {
      true: "border-zinc-200 dark:border-zinc-700"
    }
  }
});

export function Radio(props: RadioProps) {
  return (
    <RACRadio
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "group flex items-center gap-2 text-sm text-zinc-800 transition disabled:text-zinc-300 dark:text-zinc-200 dark:disabled:text-zinc-600"
      )}
    >
      {renderProps => (
        <>
          <div className={styles(renderProps)} />
          {props.children}
        </>
      )}
    </RACRadio>
  );
}
