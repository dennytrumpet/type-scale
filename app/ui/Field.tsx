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
  TextAreaProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "../utils";

interface StylePropsPlus extends CSSProperties {
  fieldSizing: "content";
}

export function Label(props: LabelProps) {
  return (
    <_Label
      {...props}
      className={twMerge(
        "w-fit cursor-default text-sm font-medium text-sage-11",
        props.className,
      )}
    />
  );
}

export function Description(props: TextProps) {
  return (
    <Text
      {...props}
      slot="description"
      className={twMerge("text-sm text-sage-11", props.className)}
    />
  );
}

export function FieldError(props: FieldErrorProps) {
  return (
    <_FieldError
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "text-sm text-red-600 forced-colors:text-[Mark]",
      )}
    />
  );
}

export const fieldBorderStyles = tv({
  variants: {
    isFocusWithin: {
      false: "border-sage-7",
      true: "border-sage-9 focus:border-sage-9",
    },
    isInvalid: {
      true: "border-red-600 dark:border-red-600 forced-colors:border-[Mark]",
    },
    isDisabled: {
      true: "border-gray-200 dark:border-zinc-700 forced-colors:border-[GrayText]",
    },
  },
});

export const fieldGroupStyles = tv({
  extend: focusRing,
  base: "group flex items-center h-9 bg-sage-12 forced-colors:bg-[Field] border-2 rounded-lg overflow-hidden",
  variants: fieldBorderStyles.variants,
});

export function FieldGroup(props: GroupProps) {
  return (
    <Group
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldGroupStyles({ ...renderProps, className }),
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
        "min-w-0 flex-1 bg-sage-1 px-2 py-1.5 text-base text-sage-11 outline outline-0 focus:ring-0 disabled:text-sage-9 sm:text-sm",
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
        "min-w-0 flex-1 resize-none bg-sage-1 px-2 py-1.5 text-base text-sage-11 outline outline-0 focus:ring-0 disabled:text-sage-9 sm:text-sm",
      )}
      style={
        {
          minHeight: "calc(2lh + 2em)",
          maxHeight: "calc(4lh + 2em)",
          fieldSizing: "content",
        } as StylePropsPlus
      }
    />
  );
}
