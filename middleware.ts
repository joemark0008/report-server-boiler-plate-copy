// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { JWTPayload } from "jose/dist/types/types";

export const config = {
  runtime: "experimental-edge", // this is a pre-requisite
  regions: ["hnd1"], // only execute this function on iad1
  matcher: ["/", "/admin/:path*", "/login"],
};

const verify = async (token: string, secret: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
};

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("authtoken")?.value;
  const role = request.cookies.get("role")?.value || "";
  const response = NextResponse.next();
  const destination = request.nextUrl.clone();

  if (token === undefined) {
    if (!request.nextUrl.pathname.startsWith("/login")) {
      destination.pathname = `/login`;
      return NextResponse.redirect(destination);
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/login")) {
      destination.pathname = `/`;
      return NextResponse.redirect(destination);
    } else {
      try {
        let secret = process.env.NEXT_PUBLIC_JWT_SECRET || "";
        await verify(token, secret);
        return NextResponse.next();
      } catch (error) {
        //delete role and token
        response.cookies.set("authtoken", token);
        response.cookies.set("role", role);

        response.cookies.delete("authtoken");
        response.cookies.delete("role");
        return response;
      }
    }
  }
}
