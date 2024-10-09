import { Booking } from "./types";
import { DateRange } from "react-day-picker";

export const calculateTotal = (
  checkIn: Date,
  checkOut: Date,
  price: number
) => {
  const totalNights = calculateDaysBetween(checkIn, checkOut);
  const subTotal = totalNights * price;
  const cleaning = 21;
  const service = 40;
  const tax = subTotal * 0.1;
  const orderTotal = subTotal + cleaning + service + tax;
  return { totalNights, subTotal, cleaning, service, tax, orderTotal };
};
export const calculateDaysBetween = (checkIn: Date, checkOut: Date) => {
  const diffInMS = Math.abs(checkIn.getTime() - checkOut.getTime());
  return diffInMS / (1000 * 60 * 60 * 24);
};
export const generateBlockedPeriod = (bookings: Booking[]) => {
  const disabledPeriods: DateRange[] = [
    ...bookings.map((b) => ({
      from: b.checkIn,
      to: b.checkOut,
    })),
    {
      from: new Date(0),
      to: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
    },
  ];
  return disabledPeriods;
};

export const generateDateRange = (range: DateRange) => {
  if (!range || !range.from || !range.to) return;
  let startDate = new Date(range.from);
  const endDate = new Date(range.to);
  const dateRange: string[] = [];
  while (startDate <= endDate) {
    const dateToString = startDate.toISOString().split("T")[0];
    dateRange.push(dateToString);
    startDate.setDate(startDate.getDate() + 1);
  }
  return dateRange;
};

export const generateDisabledDates = (blockedPeriods: DateRange[]) => {
  const disabledDates: { [key: string]: boolean } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  blockedPeriods.forEach((range) => {
    if (!range.from || !range.to) return;
    let startDate = new Date(range.from);
    const endDate = new Date(range.to);
    if (endDate < today) return;
    if (startDate < today) startDate = new Date(today);
    while (startDate <= endDate) {
      const dateToString = startDate.toISOString().split("T")[0];
      disabledDates[dateToString] = true;
      startDate.setDate(startDate.getDate() + 1);
    }
  });
  return disabledDates;
};
