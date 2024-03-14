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
import { IoSend } from "react-icons/io5";
import { Textarea } from "../ui/textarea";

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
    <div className="fixed bottom-0 w-full flex justify-center items-center gap-4 py-4 bg-background">
      <Dialog>
        <DialogTrigger>
          <MdPermMedia className="h-7 w-7" />
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
          className="flex justify-evenly items-center gap-4"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter a message"
                    className="resize-none w-50 lg:w-80 rounded-lg min-h-10 outline-none"
                    maxLength={200}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="h-8 w-12" type="submit">
            <IoSend className=" h-5 w-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default MessageForm;
