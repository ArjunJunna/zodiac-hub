export { default } from "next-auth/middleware";

export const config = { matcher: ["/z/:path*", "/post/:path*", "/profile"] };
