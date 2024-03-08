"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";

interface Prop {
  label?: string;
  type: "google" | "github";
}

function SocialButton({ label, type }: Prop) {
  return (
    <>
      <Button
        variant={"outline"}
        size={"lg"}
        className="rounded-md flex items-center gap-3 py-6 px-10"
        type="submit"
        onClick={async () => {
          signIn(type);
        }}
      >
        {type == "google" ? (
          <FcGoogle className="h-8 w-8" />
        ) : (
          <ImGithub className="h-8 w-8" />
        )}{" "}
        <span className="font-bold text-base">{label}</span>
      </Button>
    </>
  );
}

export default SocialButton;
