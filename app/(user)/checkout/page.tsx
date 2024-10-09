"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import axios from "axios";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Page() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const fetchClientSecret = useCallback(async () => {
    const res = await axios.post("/api/payment", { bookingId });
    return res.data.clientSecret;
  }, [bookingId]);

  const options = { fetchClientSecret };
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
