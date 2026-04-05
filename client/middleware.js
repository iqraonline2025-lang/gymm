import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect unauthorized users here
  },
});

export const config = { 
  matcher: [
    "/dashboard/:path*", 
    "/profile/:path*",
  ] 
};