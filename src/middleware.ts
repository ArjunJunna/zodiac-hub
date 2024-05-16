export { default } from "next-auth/middleware";

export const config = { matcher: ["/f/:path*", "/post/:path*","/profile"] };
