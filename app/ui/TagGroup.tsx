import { XIcon } from "lucide-react";
import React, { createContext, useContext } from "react";
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagGroupProps as AriaTagGroupProps,
  TagProps as AriaTagProps,
  Button,
  TagList,
  TagListProps,
  Text,
  composeRenderProps
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Description, Label } from "./Field";
import { focusRing } from "@/app/ui/utils";

const colors = {
  gray: "bg-zinc-100 text-zinc-600 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500",
  green:
    "bg-green-100 text-green-700 border-green-200 hover:border-green-300 dark:bg-green-300/20 dark:text-green-400 dark:border-green-300/10 dark:hover:border-green-300/20",
  yellow:
    "bg-yellow-100 text-yellow-700 border-yellow-200 hover:border-yellow-300 dark:bg-yellow-300/20 dark:text-yellow-400 dark:border-yellow-300/10 dark:hover:border-yellow-300/20",
  blue: "bg-zinc-100 text-zinc-700 border-zinc-200 hover:border-zinc-300 dark:bg-zinc-400/20 dark:text-zinc-300 dark:border-zinc-400/10 dark:hover:border-zinc-400/20"
};

type Color = keyof typeof colors;
const ColorContext = createContext<Color>("gray");

const tagStyles = tv({
  extend: focusRing,
  base: "flex max-w-fit cursor-default items-center gap-1 rounded-full border px-3 py-0.5 text-xs transition",
  variants: {
    color: {
      gray: "",
      green: "",
      yellow: "",
      blue: ""
    },
    allowsRemoving: {
      true: "pr-1"
    },
    isSelected: {
      true: "border-transparent bg-zinc-600 text-zinc-100"
    },
    isDisabled: {
      true: "bg-zinc-100 text-zinc-300"
    }
  },
  compoundVariants: (Object.keys(colors) as Color[]).map(color => ({
    isSelected: false,
    color,
    class: colors[color]
  }))
});

export interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
  color?: Color;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export interface TagProps extends AriaTagProps {
  color?: Color;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup
      {...props}
      className={twMerge("flex flex-col gap-1", props.className)}
    >
      <Label>{label}</Label>
      <ColorContext.Provider value={props.color || "gray"}>
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className="flex flex-wrap gap-1"
        >
          {children}
        </TagList>
      </ColorContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  );
}

const removeButtonStyles = tv({
  extend: focusRing,
  base: "pressed:bg-zinc-950/20 dark:pressed:bg-zinc-100/20 flex cursor-default items-center justify-center rounded-full p-0.5 transition-[background-color] hover:bg-zinc-950/10 dark:hover:bg-zinc-950/10"
});

export function Tag({ children, color, ...props }: TagProps) {
  let textValue = typeof children === "string" ? children : undefined;
  let groupColor = useContext(ColorContext);
  return (
    <AriaTag
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagStyles({ ...renderProps, className, color: color || groupColor })
      )}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden className="h-3 w-3" />
            </Button>
          )}
        </>
      )}
    </AriaTag>
  );
}
