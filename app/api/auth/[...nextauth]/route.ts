import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "register",
      id: "register",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (user) {
          console.log("User already exists");
          return null;
        }

        const hashedPassword = await hash(credentials.password as string, 10);

        const newUser = await prisma.user.create({
          data: {
            email: credentials.email as string,
            password: hashedPassword,
            loginType: "CREDENTIAL",
          },
        });

        return { id: String(newUser.id), email: newUser.email };
      },
    }),
    CredentialsProvider({
      name: "login",
      id: "login",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        if (user.loginType !== "CREDENTIAL") {
          console.log("Login type not credential");
          return null;
        }

        const isValid = await compare(
          credentials.password as string,
          user.password as string
        );
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }
        return { id: String(user.id), email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ account, profile }) {
      if (!account) return false;

      if (account.provider === "GOOGLE") {
        if (!profile) return false;

        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.email as string,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email as string,
              profileImage:
                (profile.image as string) ??
                ((profile as { picture: string }).picture as string),
              loginType: "GOOGLE",
              isVerified: true,
              name: profile.name,
            },
          });
          return true;
        }

        if (existingUser.loginType !== "GOOGLE") {
          return false;
        }

        return true;
      }

      if (account.provider === "register" || account.provider === "login") {
        return true;
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      const getUserdetails = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
        select: {
          id: true,
          email: true,
          role: true,
          isVerified: true,
          _count: true,
        },
      });

      if (getUserdetails) {
        token.id = getUserdetails.id;
        token.email = getUserdetails.email;
        token.role = getUserdetails.role;
        token.isVerified = getUserdetails.isVerified;
        token.link = getUserdetails?._count.shortUrls;
      }

      if (!user && account?.provider === "GOOGLE" && profile?.email) {
        const existingUser = prisma.user.findUnique({
          where: { email: profile.email as string },
          select: {
            id: true,
            email: true,
            role: true,
            isVerified: true,
            _count: true,
          },
        });

        if (existingUser) {
          token.id = (await existingUser)?.id as string;
          token.email = (await existingUser)?.email;
          token.role = (await existingUser)?.role;
          token.isVerified = (await existingUser)?.isVerified;
          token.link = (await existingUser)?._count.shortUrls;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.link = token.link as number;
      }
      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
