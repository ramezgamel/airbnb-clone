"use server";
import db from "@/utils/db";
import { getAuthUser, renderError } from "./helper";
import { calculateTotal } from "@/utils/calender";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const confirmBooking = async (
  prevState: { propertyId: string; checkIn: Date; checkOut: Date },
  formData: FormData
) => {
  const user = await getAuthUser();
  const { propertyId, checkIn, checkOut } = prevState;
  await db.booking.deleteMany({
    where: {
      profileId: user.id,
      paymentStatus: false,
    },
  });
  const property = await db.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      price: true,
    },
  });
  if (!property) return { message: "Property not found!" };
  const { totalNights, orderTotal } = calculateTotal(
    checkIn,
    checkOut,
    property.price
  );
  let bookingId;
  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId,
      },
    });
    bookingId = booking.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?bookingId=${bookingId}`);
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  return await db.booking.findMany({
    where: { profileId: user.id, paymentStatus: true },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const DeleteBooking = async (prevState: { bookingId: string }) => {
  const user = await getAuthUser();
  try {
    await db.booking.delete({
      where: {
        id: prevState.bookingId,
        profileId: user.id,
      },
    });
    revalidatePath("/bookings");
    return { message: "Booking deleted" };
  } catch (error) {
    return renderError(error);
  }
};

export const getReservations = async () => {
  const user = await getAuthUser();
  return await db.booking.findMany({
    where: {
      paymentStatus: true,
      property: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          country: true,
        },
      },
    },
  });
};

export const getReservationsStats = async () => {
  const user = await getAuthUser();
  const properties = await db.property.count({ where: { profileId: user.id } });
  const totals = await db.booking.aggregate({
    where: {
      property: {
        profileId: user.id,
      },
    },
    _sum: {
      orderTotal: true,
      totalNights: true,
    },
  });
  return {
    properties,
    nights: totals._sum.totalNights || 0,
    amount: totals._sum.orderTotal,
  };
};
