"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import addMessage from "@/actions/chat";
import { IoSend } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import AttachmentUploaderModal from "./attachment-uploader-modal";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "",
  }),
});

function MessageForm({ roomId }: { roomId: string }) {
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
    <div className="fixed bottom-0 w-80 flex justify-center items-center gap-4 pb-4 pt-0 bg-background">
      <AttachmentUploaderModal roomId={roomId} />

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
                    className="resize-none w-50 sm:w-80 rounded-lg min-h-10 outline-none"
                    maxLength={200}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={null} className="p-0 bg-transparent" type="submit">
            <IoSend className="h-7 w-7 text-primary" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default MessageForm;
