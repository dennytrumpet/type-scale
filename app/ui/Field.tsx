import React, { CSSProperties } from "react";
import {
  FieldErrorProps,
  Group,
  GroupProps,
  InputProps,
  LabelProps,
  FieldError as _FieldError,
  Input as _Input,
  Label as _Label,
  TextArea as _TextArea,
  Text,
  TextProps,
  composeRenderProps,
  TextAreaProps
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "@/lib/utils";

interface StylePropsPlus extends CSSProperties {
  fieldSizing: "content";
}

export function Label(props: LabelProps) {
  return (
    <_Label
      {...props}
      className={twMerge(
        "w-fit cursor-default text-sm font-medium text-zinc-600 dark:text-zinc-400",
        props.className
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge(
        "text-sm text-zinc-600 dark:text-zinc-400",
        props.className
      )}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <_FieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-red-600"
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: "border-zinc-950/10 dark:border-zinc-100/10",
      true: "border-zinc-950/20 dark:border-zinc-100/20"
    },
    isInvalid: {
      true: "border-red-600 dark:border-red-600"
    },
    isDisabled: {
      true: "border-zinc-950/10 dark:border-zinc-100/10"
    }
  }
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center h-9 bg-zinc-100 dark:bg-zinc-950 border-2 rounded-lg overflow-hidden",
  variants: fieldBorderStyles.variants
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className })
      )}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <_Input
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "min-w-0 flex-1 bg-zinc-100 px-2 py-1.5 text-base text-zinc-800 outline outline-0 disabled:text-zinc-200 dark:bg-zinc-950 dark:text-zinc-200 dark:disabled:text-zinc-600"
      )}
    />
  );
}

export function TextArea(props: TextAreaProps) {
  return (
    <_TextArea
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "min-w-0 flex-1 resize-none bg-zinc-100 px-2 py-1.5 text-base text-zinc-800 outline outline-0 disabled:text-zinc-200 dark:bg-zinc-950 dark:text-zinc-200 dark:disabled:text-zinc-600"
      )}
      style={
        {
          minHeight: "calc(2lh + 2em)",
          maxHeight: "calc(4lh + 2em)",
          fieldSizing: "content"
        } as StylePropsPlus
      }
    />
  );
}
