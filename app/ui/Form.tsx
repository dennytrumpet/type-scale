"use client";
import React from "react";
import { FormProps, Form as _Form } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export default function Form(props: FormProps) {
  return (
    <_Form
      {...props}
      className={twMerge("flex flex-col gap-4", props.className)}
    />
  );
}
