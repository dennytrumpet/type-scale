import React from "react";
import {
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  Tabs as RACTabs,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
  composeRenderProps
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/app/ui/utils";

const tabsStyles = tv({
  base: "flex gap-4",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row"
    }
  }
});

export function Tabs(props: TabsProps) {
  return (
    <RACTabs
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className })
      )}
    />
  );
}

const tabListStyles = tv({
  base: "flex gap-1",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start"
    }
  }
});

export function TabList<T extends object>(props: TabListProps<T>) {
  return (
    <RACTabList
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabListStyles({ ...renderProps, className })
      )}
    />
  );
}

const tabProps = tv({
  extend: focusRing,
  base: "flex cursor-default items-center rounded-full px-4 py-1.5 text-sm font-medium transition",
  variants: {
    isSelected: {
      false:
        "pressed:text-zinc-700 dark:pressed:text-zinc-200 pressed:bg-zinc-200 dark:pressed:bg-zinc-800 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-200",
      true: "bg-zinc-800 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-950"
    },
    isDisabled: {
      true: "selected:text-zinc-300 dark:selected:text-zinc-500 selected:bg-zinc-200 dark:selected:bg-zinc-600 text-zinc-200 dark:text-zinc-600"
    }
  }
});

export function Tab(props: TabProps) {
  return (
    <RACTab
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabProps({ ...renderProps, className })
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: "flex-1 p-4 text-sm text-zinc-900 dark:text-zinc-100"
});

export function TabPanel(props: TabPanelProps) {
  return (
    <RACTabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className })
      )}
    />
  );
}
