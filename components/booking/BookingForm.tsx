"use client";

import { calculateTotal } from "@/utils/calender";
import { useProperty } from "@/utils/store";
import { Card, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import { Separator } from "../ui/separator";

export default function BookingForm() {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  const { subTotal, totalNights, cleaning, service, tax, orderTotal } =
    calculateTotal(checkIn, checkOut, price);
  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">Summary</CardTitle>
      <FormRow label={`${price} x ${totalNights} nights`} amount={subTotal} />
      <FormRow label="Cleaning Fee" amount={cleaning} />
      <FormRow label="Service Fee" amount={service} />
      <FormRow label="Tax" amount={tax} />
      <Separator className="mt-4" />
      <CardTitle className="mt-8">
        <FormRow label="Booking Total" amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </div>
  );
}
