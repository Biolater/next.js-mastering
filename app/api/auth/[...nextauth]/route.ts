import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth types to include custom properties
declare module "next-auth" {
    interface User {
        accessToken?: string;
        refreshToken?: string;
    }

    interface Session {
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
    }
}

const handler = NextAuth({
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "MockLogin",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    credentials?.email === "test@example.com" &&
                    credentials.password === "pass123"
                ) {
                    return {
                        id: "123",
                        email: credentials.email,
                        accessToken: "mock-access-token",
                        refreshToken: "mock-refresh-token",
                        name: "Test User",
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                email: token.email,
                name: token.name,
            };
            session.accessToken = token.accessToken;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
