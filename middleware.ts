import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/bookings(.*)",
  "/favorites(.*)",
  "/profile(.*)",
  "/rentals(.*)",
  "/reviews(.*)",
  "/checkout(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (isProtected(request)) {
    auth().protect();
  }
});

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
// };
