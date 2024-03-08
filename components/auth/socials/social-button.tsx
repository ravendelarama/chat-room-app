"use client";
import login from "@/actions/login";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Prop {
  label?: string;
  type: "google" | "github";
}

function SocialButton({ label, type }: Prop) {
  return (
    <>
      <form
        onSubmit={async () => {
          await login(type);
        }}
        className="space-y-8"
      >
        <Button
          variant={"outline"}
          size={"lg"}
          className="rounded-md flex items-center gap-3 py-6 px-10"
          type="submit"
          onClick={async () => {
            await login(type);
          }}
        >
          {type == "google" ? (
            <FcGoogle className="h-8 w-8" />
          ) : (
            <ImGithub className="h-8 w-8" />
          )}{" "}
          <span className="font-bold text-base">{label}</span>
        </Button>
      </form>
    </>
  );
}

export default SocialButton;
