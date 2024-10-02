"use server";
import db from "@/utils/db";
import validateData from "@/schemas/validateSchema";
import { getAuthUser, renderError } from "./helper";
import { ReviewSchema } from "@/schemas/ReviewSchema";
import { revalidatePath } from "next/cache";

export async function createReview(prevData: any, formData: FormData) {
  const user = await getAuthUser();
  try {
    const validatedData = validateData(
      ReviewSchema,
      Object.fromEntries(formData)
    );
    await db.review.create({
      data: {
        profileId: user.id,
        ...validatedData,
      },
    });
    revalidatePath(`/properties/${validatedData.propertyId}`);
    return { message: "created review" };
  } catch (error) {
    return renderError(error);
  }
}
export async function getAllReviews(propertyId: string) {
  return await db.review.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getUserReviews() {
  const user = await getAuthUser();
  return await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
export async function deleteReview(prevData: { reviewId: string }) {
  const { reviewId } = prevData;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "Review Deleted" };
  } catch (error) {
    return renderError(error);
  }
}
export async function updateReview() {}
