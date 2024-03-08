"use server"

import { signIn } from "@/auth";

export default async function login(type: string) {
    signIn(type);
}