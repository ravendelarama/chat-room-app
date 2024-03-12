"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { UploadButton } from "@/utils/uploadthing";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import addMessage from "@/actions/chat";
import { useState } from "react";
import { toast } from "sonner";
import { MdPermMedia } from "react-icons/md";
import addAttachment from "@/actions/attachment";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "",
  }),
});

interface UploadedFile {
  type: string;
  source: string;
}

function MessageForm({ roomId }: { roomId: string }) {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    await addMessage(roomId, values.message!);
  }

  return (
    <div className="flex items-center gap-5">
      <Dialog>
        <DialogTrigger>
          <MdPermMedia className="h-7 w-7 text-gray-800" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload your files here?</DialogTitle>
          </DialogHeader>
          <UploadButton
            endpoint="messageAttachment"
            onClientUploadComplete={async (res) => {
              // Do something with the response
              console.log("Files: ", res);
              await addAttachment(
                roomId,
                res.map((item) => {
                  const src = item.url.split("/");
                  return {
                    type: item.type,
                    source: src[src.length - 1],
                  };
                })
              );

              toast("Files Uploaded Successfully!");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </div>
  );
}

export default MessageForm;
