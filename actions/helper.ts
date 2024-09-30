import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Please login first.");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

export const renderError = (error: unknown): { message: string } => {
  console.log("*********\n" + error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};
