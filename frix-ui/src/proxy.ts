import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Tell the bouncer that the sign-in and sign-up pages are PUBLIC
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // If the route is NOT public, force the user to log in
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!.*\\..*|_next).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // 🔥 Required for Next.js 16 / Clerk v5
    "/__clerk/(.*)"
  ],
};