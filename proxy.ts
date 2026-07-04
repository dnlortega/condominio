import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/jwt";

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        const session = request.cookies.get("session")?.value;
        const valid = session ? await isValid(session) : false;
        if (!valid) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (pathname.startsWith("/portal") && pathname !== "/portal/login") {
        const session = request.cookies.get("resident_session")?.value;
        const valid = session ? await isValid(session) : false;
        if (!valid) {
            return NextResponse.redirect(new URL("/portal/login", request.url));
        }
    }

    return NextResponse.next();
}

async function isValid(token: string) {
    try {
        await decrypt(token);
        return true;
    } catch {
        return false;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/portal/:path*"],
};
