"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  generateBlockedPeriod,
  generateDateRange,
  generateDisabledDates,
} from "@/utils/calender";
import { useProperty } from "@/utils/store";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useToast } from "../hooks/use-toast";
export default function BookingCalender() {
  const { toast } = useToast();
  const currentDate = new Date();
  const defaultSelected: DateRange = {
    from: undefined,
    to: undefined,
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  const unavailableDates = generateDisabledDates(
    generateBlockedPeriod(bookings)
  );
  useEffect(() => {
    if (range) {
      const selectedRange = generateDateRange(range);
      if (!selectedRange) return;
      const isDisabledDateIncluded = selectedRange.some((date) => {
        if (unavailableDates[date]) {
          setRange(defaultSelected);
          toast({
            description: "Some date are booked. Please select again",
          });
          return true;
        } else return false;
      });
    }
    useProperty.setState({ range });
  }, [range]);
  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      disabled={generateBlockedPeriod(bookings)}
    />
  );
}
