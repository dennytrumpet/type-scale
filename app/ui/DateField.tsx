import React from "react";
import {
  DateField as AriaDateField,
  DateFieldProps as AriaDateFieldProps,
  DateInput as AriaDateInput,
  DateInputProps,
  DateSegment,
  DateValue,
  ValidationResult
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label, fieldGroupStyles } from "./Field";
import { composeTailwindRenderProps } from "@/app/ui/utils";

export interface DateFieldProps<T extends DateValue>
  extends AriaDateFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) {
  return (
    <AriaDateField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1"
      )}
    >
      {label && <Label>{label}</Label>}
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaDateField>
  );
}

const segmentStyles = tv({
  base: "type-literal:px-0 inline rounded p-0.5 text-zinc-800 caret-transparent outline outline-0 dark:text-zinc-200",
  variants: {
    isPlaceholder: {
      true: "italic text-zinc-600 dark:text-zinc-400"
    },
    isDisabled: {
      true: "text-zinc-200 dark:text-zinc-600"
    },
    isFocused: {
      true: "bg-zinc-600 text-zinc-100 dark:text-zinc-100"
    }
  }
});

export function DateInput(props: Omit<DateInputProps, "children">) {
  return (
    <AriaDateInput
      className={renderProps =>
        fieldGroupStyles({
          ...renderProps,
          class: "block min-w-[150px] px-2 py-1.5 text-sm"
        })
      }
      {...props}
    >
      {segment => <DateSegment segment={segment} className={segmentStyles} />}
    </AriaDateInput>
  );
}
