import { deleteReview, getUserReviews } from "@/actions/review";
import { IconButton } from "@/components/form/buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import Title from "@/components/properties/Title";
import ReviewCard from "@/components/reviews/ReviewCard";

export default async function ReviewsPage() {
  const reviews = await getUserReviews();
  if (reviews.length === 0) return <EmptyList />;
  return (
    <>
      <Title text="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const reviewInfo = {
            name: review.property.name,
            image: review.property.image,
            createdAt: review.createdAt,
            rating: review.rating,
            comment: review.comment,
          };
          return (
            <ReviewCard key={review.id} review={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteA = deleteReview.bind(null, { reviewId });
  return (
    <FormContainer action={deleteA}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};
