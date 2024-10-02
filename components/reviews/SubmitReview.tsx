"use client";

import { createReview } from "@/actions/review";
import FormContainer from "../form/FormContainer";
import RatingInput from "../form/RatingInput";
import TextareaInput from "../form/TextareaInput";
import { SubmitButton } from "../form/buttons";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function SubmitReview({ propertyId }: { propertyId: string }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mt-8">
      <Button onClick={() => setShowForm((prev) => !prev)}>
        Leave a Review
      </Button>
      {showForm && (
        <Card className="mt-8 p-8">
          <FormContainer action={createReview}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" label="Rating" />
            <TextareaInput name="comment" label="Write your feedback." />
            <SubmitButton text="Submit" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
