import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware"  // sabhi jagah hm middleware chala rahe hai hai 
import { getToken } from "next-auth/jwt"; // Token ko nikal rahe hai next-auth se 

export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl

    if(token &&
        (
            url.pathname.startsWith('sigh-in') ||
            url.pathname.startsWith('sigh-up') ||
            url.pathname.startsWith('verify')  ||
            url.pathname.startsWith('/')
        )
    ){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/dashboard/:path*",
    "/verify/:path*"
  ],
};

/* 

   1. config => Iske under jitne path define hote hai sirf vahi vahi hi middleware apply hota hai 

 */