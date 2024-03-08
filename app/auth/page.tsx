"use client";

import { signIn } from "next-auth/react";
import SocialButton from "@/components/auth/socials/social-button";
import { Button } from "@/components/ui/button";

function AuthPage() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">Connect with us</h1>

      <SocialButton label="Continue with Google" type="google" />
      <SocialButton label="Continue with Github" type="github" />
    </div>
  );
}

export default AuthPage;
