import React from "react";
import {
  TextField as _TextField,
  TextFieldProps as _TextFieldProps,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderStyles,
  TextArea,
} from "./Field";
import { composeTailwindRenderProps, focusRing } from "../utils";

const inputStyles = tv({
  extend: focusRing,
  base: "border-2 rounded-md",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

export interface TextFieldProps extends _TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  multiline?: boolean;
}

export default function TextField({
  label,
  description,
  errorMessage,
  ...props
}: TextFieldProps) {
  const InputComponent = props.multiline ? TextArea : Input;
  return (
    <_TextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <InputComponent className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </_TextField>
  );
}
