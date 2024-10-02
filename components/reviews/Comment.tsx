"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function Comment({ comment }: { comment: string }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <p>
        {comment.length > 130 && !isShow
          ? comment.slice(0, 130) + "..."
          : comment}
      </p>
      {comment.length > 130 && (
        <Button
          className="!py-0 float-right"
          onClick={() => setIsShow((prev) => !prev)}
          variant="link"
        >
          {isShow ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}
