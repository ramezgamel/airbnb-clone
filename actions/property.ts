"use server";

import db from "@/utils/db";
import validateSchema from "@/schemas/validateSchema";
import { getAdminUser, getAuthUser, renderError } from "./helper";
import { propertySchema } from "@/schemas/PropertySchema";
import { imageSchema } from "@/schemas/ProfileSchema";
import { uploadImage } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/utils/format";
import { truncateByDomain } from "recharts/types/util/ChartUtils";

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
      bookings: {
        select: { checkIn: true, checkOut: true },
      },
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

export async function deleteRental(prevState: { propertyId: string }) {
  const user = await getAuthUser();
  try {
    await db.property.delete({
      where: {
        id: prevState.propertyId,
        profileId: user.id,
      },
    });
    revalidatePath("/rentals");
    return { message: "Rental deleted" };
  } catch (error) {
    return renderError(error);
  }
}

export async function getUserRentals() {
  const user = await getAuthUser();
  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  const rentalsBooking = await Promise.all(
    rentals.map(async (rent) => {
      const totalNight = await db.booking.aggregate({
        where: { propertyId: rent.id, paymentStatus: true },
        _sum: { totalNights: true },
      });
      const orderTotal = await db.booking.aggregate({
        where: { propertyId: rent.id, paymentStatus: true },
        _sum: { orderTotal: true },
      });
      return {
        ...rent,
        totalNightsSum: totalNight._sum?.totalNights,
        orderTotalSum: orderTotal._sum.orderTotal,
      };
    })
  );

  return rentalsBooking;
}

export async function getRentalDetails(propertyId: string) {
  const user = await getAuthUser();
  return await db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  });
}

export async function updateProperty(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  const id = formData.get("id") as string;
  try {
    const validatedFields = validateSchema(
      propertySchema,
      Object.fromEntries(formData)
    );
    await db.property.update({
      where: {
        id,
        profileId: user.id,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/rentals/${id}/edit`);
    return { message: "Updated" };
  } catch (error: any) {
    return renderError(error);
  }
}

export async function updatePropertyImage(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  const id = formData.get("id") as string;
  try {
    const image = formData.get("image") as File;
    const validateImage = validateSchema(imageSchema, { image });
    const path = await uploadImage(validateImage.image);
    await db.property.update({
      where: {
        id,
        profileId: user.id,
      },
      data: {
        image: path,
      },
    });
    revalidatePath(`/rentals/${id}/edit`);
    return { message: "Image Updated" };
  } catch (error) {
    return renderError(error);
  }
}

export const fetchStats = async () => {
  await getAdminUser();
  const usersCount = await db.profile.count();
  const propertiesCount = await db.property.count();
  const bookingsCount = await db.booking.count({
    where: {
      paymentStatus: true,
    },
  });
  return {
    usersCount,
    propertiesCount,
    bookingsCount,
  };
};

export const fetchChartsData = async () => {
  await getAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const bookings = await db.booking.findMany({
    where: {
      createdAt: {
        gte: date,
      },
      paymentStatus: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  let bookingsPerMonth = bookings.reduce((total: any, current) => {
    const date = formatDate(current.createdAt, true);
    const existingEntry = total.find((entry: any) => entry.date == date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }
    return total;
  }, [] as Array<{ date: string; count: number }>);
  return bookingsPerMonth;
};
