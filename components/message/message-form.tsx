"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/utils/uploadthing";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import addMessage from "@/actions/chat";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "",
  }),
});

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
    await addMessage(roomId, values.message!, uploadedFiles!);
  }

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { type: string; source: string }[]
  >([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "messageAttachment",
    {
      onClientUploadComplete: (res) => {
        const arr = res.map((item) => {
          return {
            type: item.type.split("/")[0],
            source: item.name,
          };
        });
        setUploadedFiles(arr);
        toast("Uploading Successful!");
      },
      onUploadError: () => {
        toast("Uploading Failed!");
      },
      onUploadBegin: () => {},
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          {files.length > 0 && (
            <Button variant={"default"} onClick={() => startUpload(files)}>
              Upload {files.length} files
            </Button>
          )}
        </div>
        Drop files here!
      </div>
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
    </>
  );
}

export default MessageForm;
