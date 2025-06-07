import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJWT(token: string): any | null {
  try {
    const base64 = token.split(".")[1];
    const payload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const jwt = request.cookies.get("jwt")?.value;
  const user = jwt ? decodeJWT(jwt) : null;

  if (pathname.startsWith("/administrar") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/administrar") && user?.tipo !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/perfil") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    user &&
    (pathname.startsWith("/login") || pathname.startsWith("/cadastro"))
  ) {
    return NextResponse.redirect(new URL("/perfil", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/administrar/:path*",
    "/perfil/:path*",
    "/login/:path*",
    "/cadastro/:path*",
  ],
};
