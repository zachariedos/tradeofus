import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const session = await getToken({
        req,
        secret: process.env.AUTH_SECRET!,
        salt: "authjs.session-token",
        raw: true,
        cookieName: "authjs.session-token"
    });
    if (req.nextUrl.pathname.startsWith('/api/auth/signin') && session) {
        const url = req.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url)
    } else if (req.nextUrl.pathname.startsWith('/api/auth/signin') && !session) {
        return NextResponse.next()
    }
    if (!session) {
        const url = req.nextUrl.clone();
        url.pathname = '/api/auth/signin';
        return NextResponse.redirect(url)
    }
    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)",'/api/auth/signin'],
}