"use client";

import { useProperty } from "@/utils/store";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/buttons";
import { confirmBooking } from "@/actions/Booking";

export default function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  const createBookingAction = confirmBooking.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign in to complete booking
        </Button>
      </SignInButton>
    );
  }
  return (
    <section>
      <FormContainer action={createBookingAction}>
        <SubmitButton text="Reserve" className="w-full" />
      </FormContainer>
    </section>
  );
}
