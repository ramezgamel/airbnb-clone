import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyList({
  heading = "No items in the list.",
  text = "Keep exploring our properties",
  btn = "back home",
}) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">{heading}</h2>
      <p className="text-lg">{text}</p>
      <Button asChild size="lg" className="mt-4 capitalize">
        <Link href="/">{btn}</Link>
      </Button>
    </div>
  );
}
