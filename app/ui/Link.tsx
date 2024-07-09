import React from "react";
import {
  Link as _Link,
  LinkProps as _LinkProps,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/lib/utils";

interface LinkProps extends _LinkProps {
  variant?: "primary" | "secondary";
}

const styles = tv({
  extend: focusRing,
  base: "text-base transition-colors text-sage-12 bg-gradient-to-r from-zinc-600 via-sky-600 to-fuchsia-600 bg-clip-text hover:text-transparent",
  variants: {
    variant: {
      primary: "",
      secondary: ""
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

export default function Link(props: LinkProps) {
  return (
    <_Link
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({ ...renderProps, className, variant: props.variant })
      )}
    />
  );
}
