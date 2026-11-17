import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

// Map roles to their authorized primary dashboard paths
const ROLE_DASHBOARD_MAP: Record<string, string> = {
  ENTREPRENEUR: "/dashboard/founder",
  LAWYER: "/dashboard/advisor",
  INVESTOR: "/dashboard/investor",
  USER: "/dashboard/explore",
};

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Protect all /dashboard routes and /settings
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/settings")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If user hits /dashboard or /dashboard/ exactly, route to their role's home
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    const userRole = (req.auth?.user as any)?.role as string;
    const targetDashboard = ROLE_DASHBOARD_MAP[userRole] || "/dashboard/explore";
    return NextResponse.redirect(new URL(targetDashboard, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all paths except static files, images, and API auth routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
