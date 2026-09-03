import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { clerkConfigured } from "@/lib/env";

const middleware = clerkConfigured() ? clerkMiddleware() : () => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
