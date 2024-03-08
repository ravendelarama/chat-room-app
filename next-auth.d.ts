import { User } from "@prisma/client";
import NextAuth, {type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: Pick<User, "id" | "image" | "name" | "email">
    }
}