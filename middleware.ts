import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const publicPaths = ["/login", "/register", "/" ];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (path.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const headers = new Headers(req.headers);
    headers.set("x-userid", token.id as string);

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
