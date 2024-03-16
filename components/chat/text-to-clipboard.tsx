import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

function TextToClipboard({
  text,
  showInput,
}: {
  text: string;
  showInput?: boolean;
}) {
  const [inviteUrl, setInviteUrl] = useState(text);

  function copyUrl(text: string) {
    navigator.clipboard.writeText(text);

    toast("Copied to clipboard");
  }
  return (
    <div className="flex gap-2 items-center">
      <Input className={cn(!showInput && "hidden")} value={text} />
      <Button
        onClick={() => {
          copyUrl(text);
        }}
        size={"sm"}
        variant="secondary"
        className="text-xs"
      >
        Copy Link
      </Button>
    </div>
  );
}

export default TextToClipboard;
