import React from "react";
import {
  Slider as _Slider,
  SliderProps as _SliderProps,
  SliderOutput,
  SliderThumb,
  SliderTrack
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "@/app/ui/utils";

const trackStyles = tv({
  base: "rounded-full",
  variants: {
    orientation: {
      horizontal: "h-[6px] w-full",
      vertical: "ml-[50%] h-full w-[6px] -translate-x-[50%]"
    },
    isDisabled: {
      false: "bg-zinc-300 dark:bg-zinc-500",
      true: "bg-zinc-100 dark:bg-zinc-800"
    }
  }
});

const thumbStyles = tv({
  extend: focusRing,
  base: "group-orientation-horizontal:mt-6 group-orientation-vertical:ml-3 h-6 w-6 rounded-full border-2 border-zinc-700 bg-zinc-50 dark:border-zinc-300 dark:bg-zinc-900",
  variants: {
    isDragging: {
      true: "bg-zinc-700 dark:bg-zinc-300"
    },
    isDisabled: {
      true: "border-zinc-300 dark:border-zinc-700"
    }
  }
});

export interface SliderProps<T> extends _SliderProps<T> {
  label?: string;
  thumbLabels?: string[];
}

export function Slider<T extends number | number[]>({
  label,
  thumbLabels,
  ...props
}: SliderProps<T>) {
  return (
    <_Slider
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "orientation-horizontal:grid orientation-vertical:flex orientation-horizontal:w-64 grid-cols-[1fr_auto] flex-col items-center gap-2"
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="orientation-vertical:hidden text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
        }
      </SliderOutput>
      <SliderTrack className="orientation-horizontal:h-6 orientation-vertical:w-6 orientation-vertical:h-64 group col-span-2 flex items-center">
        {({ state, ...renderProps }) => (
          <>
            <div className={trackStyles(renderProps)} />
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </_Slider>
  );
}
