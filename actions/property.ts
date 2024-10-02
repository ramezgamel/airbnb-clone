"use server";

import db from "@/utils/db";
import validateSchema from "@/schemas/validateSchema";
import { getAuthUser, renderError } from "./helper";
import { propertySchema } from "@/schemas/PropertySchema";
import { imageSchema } from "@/schemas/ProfileSchema";
import { uploadImage } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const validateFile = validateSchema(imageSchema, {
      image: formData.get("image") as File,
    });

    const validateFields = validateSchema(
      propertySchema,
      Object.fromEntries(formData)
    );
    const imageUrl = await uploadImage(validateFile.image);

    await db.property.create({
      data: {
        ...validateFields,
        profileId: user.id,
        image: imageUrl,
      },
    });

    return { message: "property created" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      image: true,
      tagline: true,
      price: true,
      country: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  propertyId: string;
  pathname: string;
}) => {
  const { favoriteId, propertyId, pathname } = prevState;
  try {
    const user = await getAuthUser();
    if (favoriteId) {
      await db.favorite.delete({
        where: { id: favoriteId },
      });
    } else {
      await db.favorite.create({
        data: {
          profileId: user.id,
          propertyId: propertyId,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Deleted from faves" : "Added to faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const getUserFaves = async () => {
  const user = await getAuthUser();
  const faves = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          image: true,
          tagline: true,
          price: true,
          country: true,
        },
      },
    },
  });
  return faves.map((f) => f.property);
};

export const fetchPropertyDetails = async (id: string) => {
  return db.property.findFirst({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });
};

export async function fetchPropertyRating(propertyId: string) {
  const res = await db.review.groupBy({
    by: ["propertyId"],
    _avg: { rating: true },
    _count: { rating: true },
    where: {
      propertyId,
    },
  });
  return {
    rating: res[0]?._avg.rating?.toFixed() ?? 0,
    count: res[0]?._count.rating ?? 0,
  };
}

export async function isExistingReview(propertyId: string, userId: string) {
  return await db.review.findFirst({
    where: {
      propertyId,
      profileId: userId,
    },
  });
}
