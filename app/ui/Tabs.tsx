import React, { useRef, useContext, useMemo } from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabsProps,
  composeRenderProps,
  TabListStateContext
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";
import { motion, AnimatePresence } from "framer-motion";

interface DOMRect {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
}

const tabsStyles = tv({
  base: "relative flex gap-3 rounded-lg",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-full max-w-3xl flex-row"
    }
  }
});

export function Tabs(props: TabsProps) {
  return (
    <AriaTabs
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({ ...renderProps, className })
      )}
    />
  );
}

const tabListStyles = tv({
  base: "relative z-20 flex gap-1.5",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col items-start"
    }
  }
});

export function TabList<T extends object>(props: TabListProps<T>) {
  const state = useContext(TabListStateContext);
  const tabListRef = useRef<HTMLDivElement>(null);
  const TabListVariants = ({ className }: TabListProps<T>) =>
    composeRenderProps(className, (className, renderProps) => {
      return tabListStyles({ ...renderProps, className });
    });
  const TabListIndicator = useMemo(() => {
    if (!state) return {};
    const { selectedKey } = state;
    let tabs = tabListRef && tabListRef.current?.querySelectorAll("[role=tab]");
    const selectedIndex = Array.from(tabs || []).findIndex(
      tab => tab.getAttribute("data-key") === String(selectedKey)
    );
    const selectedRect =
      (tabs && selectedKey && tabs[selectedIndex]?.getBoundingClientRect()) ||
      ({} as DOMRect);
    const tabListRect =
      tabListRef.current?.getBoundingClientRect() || ({} as DOMRect);
    return {
      width: `${selectedRect.width}px` || "135.42px",
      height: `${selectedRect.height}px` || "36px",
      x: `calc(${selectedRect.left - tabListRect.left}px)` || "4px",
      y: `calc(${selectedRect.top - tabListRect.top}px)` || "4px",
      transition: { type: "tween", duration: 0.2, ease: "easeOut" }
    };
  }, [state]);
  return (
    <div
      className="group relative rounded-lg bg-zinc-50 p-1 dark:bg-zinc-900"
      ref={tabListRef}
    >
      <AriaTabList
        {...props}
        className={TabListVariants({ className: props.className })}
      />
      <AnimatePresence>
        {state?.selectedKey && (
          <motion.div
            initial={false}
            animate={TabListIndicator}
            className="pointer-events-none absolute inset-0 z-10 rounded-md bg-white shadow dark:border-zinc-50/10 dark:bg-zinc-950"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const tabProps = tv({
  extend: focusRing,
  base: "flex cursor-default items-center rounded-md px-4 py-2 text-sm font-semibold transition-all",
  variants: {
    isSelected: {
      false: "",
      true: "text-zinc-950 dark:text-zinc-50"
    },
    isDisabled: {
      true: "text-zinc-200 selected:bg-zinc-200 selected:text-zinc-300 dark:text-zinc-600 dark:selected:bg-zinc-600 dark:selected:text-zinc-500"
    }
  }
});

export function Tab(props: TabProps) {
  return (
    <AriaTab
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabProps({ ...renderProps, className })
      )}
    />
  );
}

const tabPanelStyles = tv({
  extend: focusRing,
  base: "flex-1 rounded-lg border border-solid border-zinc-950/10 p-6 text-sm dark:border-zinc-50/10"
});

export function TabPanel(props: TabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className })
      )}
    >
      {composeRenderProps(props.children, children => (
        <>{children}</>
      ))}
    </AriaTabPanel>
  );
}
