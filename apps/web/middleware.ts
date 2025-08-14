import { NextResponse} from "next/server";
import type { NextRequest } from "next/server";

// Funksjon for å dekode JWT token og sjekke rolle
function decodeTokenAndCheckRole(token: string): boolean {
    try {
        // JWT tokens har format: header.payload.signature
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        
        // Sjekk om brukeren er administrator
        return decodedPayload.role?.toLowerCase() === 'admin';
    } catch (error) {
        console.error('Feil ved dekoding av token:', error);
        return false;
    }
}

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

    // Sjekk om brukeren er administrator
    if (!decodeTokenAndCheckRole(token)) {
        // Hvis ikke administrator, omdiriger til login med feilmelding
        const loginUrl = new URL('/login?error=unauthorized', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Hvis token finnes og brukeren er administrator, fortsett til den forespurte siden
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
