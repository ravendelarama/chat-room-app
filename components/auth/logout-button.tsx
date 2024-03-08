"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

function LogoutButton() {
  return (
    <>
      <Button
        onClick={async () => {
          await logout();
        }}
      >
        Sign out
      </Button>
    </>
  );
}

export default LogoutButton;
