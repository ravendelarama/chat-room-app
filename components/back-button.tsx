"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function BackButton() {
  const router = useRouter();

  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
    </>
  );
}

export default BackButton;
