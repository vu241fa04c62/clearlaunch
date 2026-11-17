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
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  // Protect all /dashboard routes and /settings
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/settings")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  // If user hits /dashboard or /dashboard/ exactly, route to their role's home
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    const userRole = (req.auth?.user as any)?.role as string;
    const targetDashboard = ROLE_DASHBOARD_MAP[userRole] || "/dashboard/explore";
    return Response.redirect(new URL(targetDashboard, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Match all paths except static files, images, and API auth routes
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
