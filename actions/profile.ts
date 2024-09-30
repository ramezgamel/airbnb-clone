"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { imageSchema, profileSchema } from "@/schemas/ProfileSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import db from "@/utils/db";
import validateSchema from "@/schemas/validateSchema";
import { uploadImage } from "@/utils/supabase";
import { getAuthUser, renderError } from "./helper";

export async function createProfile(prevState: any, formData: FormData) {
  try {
    const user = await getAuthUser();
    const newData = validateSchema(profileSchema, Object.fromEntries(formData));
    await db.profile.create({
      data: {
        clerkId: user.id,
        profileImage: user.imageUrl ?? "",
        email: user.emailAddresses[0].emailAddress,
        ...newData,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (err) {
    return renderError(err);
  }
  redirect("/");
}

export async function getProfileImage() {
  try {
    const user = await getAuthUser();
    let userData = await db.profile.findUnique({
      where: { clerkId: user.id },
      select: { profileImage: true },
    });
    return userData?.profileImage;
  } catch (err: any) {
    return renderError(err);
  }
}

export async function getUserProfile() {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: { clerkId: user.id },
  });
  console.log(profile);

  if (!profile) redirect("/profile/create");
  return profile;
}

export async function updateUserProfile(
  prevData: any,
  formData: FormData
): Promise<{ message: string }> {
  try {
    const user = await getAuthUser();
    const newData = validateSchema(profileSchema, Object.fromEntries(formData));
    await db.profile.update({
      where: { clerkId: user.id },
      data: newData,
    });
    revalidatePath("/profile");
    return {
      message: "Profile Updated.",
    };
  } catch (error) {
    return renderError(error);
  }
}

export async function updateProfileImage(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  try {
    const validate = validateSchema(imageSchema, {
      image: formData.get("image") as File,
    });
    const user = await getAuthUser();
    const imageUrl = await uploadImage(validate.image);

    await db.profile.update({
      where: { clerkId: user.id },
      data: { profileImage: imageUrl },
    });
    revalidatePath("/");
    return { message: "Profile image updated." };
  } catch (error) {
    revalidatePath("/profile");
    return renderError(error);
  }
}
