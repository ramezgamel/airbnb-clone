import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublic = createRouteMatcher(["/", "/properties(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, request) => {
  const isAdmin = auth().userId === process.env.ADMIN_USER_ID;
  if (isAdminRoute(request) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublic(request)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
