import { getAllReviews } from "@/actions/review";
import Title from "../properties/Title";
import ReviewCard from "./ReviewCard";

export default async function PropertyReviews({
  propertyId,
}: {
  propertyId: string;
}) {
  const reviews = await getAllReviews(propertyId);
  if (reviews.length < 1) return null;
  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((r) => {
          const review = {
            rating: r.rating,
            createdAt: r.createdAt,
            comment: r.comment,
            name: r.profile.firstName,
            image: r.profile.profileImage,
          };
          return <ReviewCard key={r.id} review={review} />;
        })}
      </div>
    </div>
  );
}
