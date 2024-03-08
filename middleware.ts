import authConfig from "@/auth.config"
import NextAuth from "next-auth"

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;

    
    if (nextUrl.pathname == "/auth" && req.auth) {
        return Response.redirect(new URL("/", nextUrl));
    }

});


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}