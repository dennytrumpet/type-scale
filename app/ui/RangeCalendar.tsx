import React from "react";
import {
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarProps as AriaRangeCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  DateValue,
  Text
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { CalendarGridHeader, CalendarHeader } from "./Calendar";
import { focusRing } from "@/app/ui/utils";

export interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "visibleDuration"> {
  errorMessage?: string;
}

const cell = tv({
  extend: focusRing,
  base: "flex h-full w-full items-center justify-center rounded-full text-zinc-900 dark:text-zinc-200",
  variants: {
    selectionState: {
      none: "group-pressed:bg-zinc-200 dark:group-pressed:bg-zinc-600 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700",
      middle: [
        "group-hover:bg-zinc-200 dark:group-hover:bg-zinc-900",
        "group-invalid:group-hover:bg-red-200 dark:group-invalid:group-hover:bg-red-900",
        "group-pressed:bg-zinc-300 dark:group-pressed:bg-zinc-800",
        "group-invalid:group-pressed:bg-red-300 dark:group-invalid:group-pressed:bg-red-800"
      ],
      cap: "bg-zinc-600 text-zinc-100 group-invalid:bg-red-600"
    },
    isDisabled: {
      true: "text-zinc-300 dark:text-zinc-600"
    }
  }
});

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar {...props}>
      <CalendarHeader />
      <CalendarGrid className="[&_td]:px-0">
        <CalendarGridHeader />
        <CalendarGridBody>
          {date => (
            <CalendarCell
              date={date}
              className="outside-month:text-zinc-300 selected:bg-zinc-100 dark:selected:bg-zinc-700/30 invalid:selected:bg-red-100 dark:invalid:selected:bg-red-700/30 selection-start:rounded-s-full selection-end:rounded-e-full group h-9 w-9 cursor-default text-sm outline outline-0 [td:first-child_&]:rounded-s-full [td:last-child_&]:rounded-e-full"
            >
              {({
                formattedDate,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isFocusVisible,
                isDisabled
              }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none",
                    isDisabled,
                    isFocusVisible
                  })}
                >
                  {formattedDate}
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  );
}
