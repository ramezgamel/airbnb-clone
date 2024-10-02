/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "../ui/card";
import Comment from "./Comment";
import Rating from "./Rating";

export default function ReviewCard({
  review,
  children,
}: {
  review: {
    rating: number;
    comment: string;
    createdAt: Date;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
}) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <img
            src={review.image as string}
            alt="profile"
            className="w-10 h-10 object-cover"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize">{review.name}</h3>
            <Rating rating={review.rating} />
            <div className="text-muted-foreground flex gap-1 items-center text-xs">
              <span>{format(review.createdAt, "dd.MM.yyyy")}</span>
              <span>{format(review.createdAt, "p")}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={review.comment} />
      </CardContent>
      <div className="absolute top-1 right-1">{children}</div>
    </Card>
  );
}
