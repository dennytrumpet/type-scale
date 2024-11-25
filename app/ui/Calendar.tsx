import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import {
  Calendar as AriaCalendar,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarProps as AriaCalendarProps,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  DateValue,
  Heading,
  Text,
  useLocale
} from "react-aria-components";
import { tv } from "tailwind-variants";
import Button from "./Button";
import { focusRing } from "@/app/ui/utils";

const cellStyles = tv({
  extend: focusRing,
  base: "justify-centerx flex h-9 w-9 cursor-default items-center rounded-full text-sm",
  variants: {
    isSelected: {
      false:
        "pressed:bg-zinc-200 dark:pressed:bg-zinc-600 text-zinc-900 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700",
      true: "bg-zinc-600 text-zinc-100 invalid:bg-red-600"
    },
    isDisabled: {
      true: "text-zinc-300 dark:text-zinc-600"
    }
  }
});

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, "visibleDuration"> {
  errorMessage?: string;
}

export function Calendar<T extends DateValue>({
  errorMessage,
  ...props
}: CalendarProps<T>) {
  return (
    <AriaCalendar {...props}>
      <CalendarHeader />
      <CalendarGrid>
        <CalendarGridHeader />
        <CalendarGridBody>
          {date => <CalendarCell date={date} className={cellStyles} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaCalendar>
  );
}

export function CalendarHeader() {
  let { direction } = useLocale();

  return (
    <header className="flex w-full items-center gap-1 px-1 pb-4">
      <Button variant="icon" slot="previous">
        {direction === "rtl" ? (
          <ChevronRight aria-hidden />
        ) : (
          <ChevronLeft aria-hidden />
        )}
      </Button>
      <Heading className="mx-2 flex-1 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-200" />
      <Button variant="icon" slot="next">
        {direction === "rtl" ? (
          <ChevronLeft aria-hidden />
        ) : (
          <ChevronRight aria-hidden />
        )}
      </Button>
    </header>
  );
}

export function CalendarGridHeader() {
  return (
    <AriaCalendarGridHeader>
      {day => (
        <CalendarHeaderCell className="text-xs font-semibold text-zinc-500">
          {day}
        </CalendarHeaderCell>
      )}
    </AriaCalendarGridHeader>
  );
}
