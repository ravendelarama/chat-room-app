"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IoIosArrowBack } from "react-icons/io";

function BackButton() {
  const router = useRouter();

  return (
    <>
      <Button
        variant={null}
        onClick={() => {
          router.back();
        }}
      >
        <IoIosArrowBack className="h-5 w-5" />
      </Button>
    </>
  );
}

export default BackButton;
