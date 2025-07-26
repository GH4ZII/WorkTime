import { NextResponse} from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Hent token fra cookies
    const token = req.cookies.get('auth_token')?.value;
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/login')) {
        return NextResponse.next();
    }

    // Hvis token ikke finnes, omdiriger til login-siden
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Hvis token finnes, fortsett til den forespurte siden
    return NextResponse.next();
}

// Definer hvilke sider middleware skal kjøre på
export const config = {
    matcher: [
        /*
         * Match alle ruter unntatt de som er for statiske filer,
         * API-kall, eller Next.js-interne filer.
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
