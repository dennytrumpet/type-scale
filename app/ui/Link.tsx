import React from "react";
import {
  Link as _Link,
  LinkProps as _LinkProps,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/app/ui/utils";

interface LinkProps extends _LinkProps {
  variant?: "primary" | "secondary";
}

const styles = tv({
  extend: focusRing,
  base: "text-sage-12 bg-gradient-to-r from-zinc-600 via-sky-600 to-fuchsia-600 bg-clip-text text-base transition-colors hover:text-transparent",
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
