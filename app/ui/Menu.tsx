import { Check, ChevronRight } from "lucide-react";
import React from "react";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuProps as AriaMenuProps,
  MenuItemProps,
  Separator,
  SeparatorProps,
  composeRenderProps
} from "react-aria-components";
import {
  DropdownSection,
  DropdownSectionProps,
  dropdownItemStyles
} from "./ListBox";
import { Popover, PopoverProps } from "./Popover";

interface MenuProps<T> extends AriaMenuProps<T> {
  placement?: PopoverProps["placement"];
}

export function Menu<T extends object>(props: MenuProps<T>) {
  return (
    <Popover placement={props.placement} className="min-w-[150px]">
      <AriaMenu
        {...props}
        className="max-h-[inherit] overflow-auto p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
      />
    </Popover>
  );
}

export function MenuItem(props: MenuItemProps) {
  return (
    <AriaMenuItem {...props} className={dropdownItemStyles}>
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {selectionMode !== "none" && (
              <span className="flex w-4 items-center">
                {isSelected && <Check aria-hidden className="h-4 w-4" />}
              </span>
            )}
            <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
              {children}
            </span>
            {hasSubmenu && (
              <ChevronRight aria-hidden className="absolute right-2 h-4 w-4" />
            )}
          </>
        )
      )}
    </AriaMenuItem>
  );
}

export function MenuSeparator(props: SeparatorProps) {
  return (
    <Separator
      {...props}
      className="mx-3 my-1 border-b border-zinc-950/10 dark:border-zinc-100/10"
    />
  );
}

export function MenuSection<T extends object>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}
