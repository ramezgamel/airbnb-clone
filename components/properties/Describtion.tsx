"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Title from "./Title";

export default function Description({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [isFullDes, setIsFullDes] = useState(false);
  const words = description.split(" ");
  const displayDes =
    words.length > 70 && !isFullDes
      ? words.splice(0, 70).join(" ") + "..."
      : description;
  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {displayDes}
      </p>
      {words.length > 70 && (
        <Button
          variant="link"
          className="pl-0"
          onClick={() => setIsFullDes((prev) => !prev)}
        >
          {isFullDes ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
}
