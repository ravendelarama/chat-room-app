"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthing";
import { useCallback, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "",
  }),
  description: z.string().optional(),
  private: z.boolean(),
});

// TODO: Must refactor the code.
function RoomForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      private: false,
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFile, setUploadedFile] = useState<String>("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "channelImageUploader",
    {
      // @ts-ignore
      onClientUploadComplete: (res) => {
        const src = res[0].url.split("/");
        setUploadedFile(src[src.length - 1]);

        toast("Uploaded Successful!", {
          description: uploadedFile,
        });
      },
      onUploadError: () => {
        toast("Uploading Failed!", {});
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axios.post("/api/room/new", {
      name: values.name,
      image: uploadedFile!,
      description: values.description,
      isPrivate: values.private,
    });

    form.reset();
  }

  return (
    <div className="py-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[17rem] sm:w-max rounded-md"
        >
          <Tabs defaultValue="step-1" className="md:w-[400px]">
            <TabsList className="w-full">
              <TabsTrigger value="step-1" className="w-full">
                Step 1
              </TabsTrigger>
              <TabsTrigger value="step-2" className="w-full">
                Step 2
              </TabsTrigger>
            </TabsList>
            <TabsContent value="step-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Channel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My channel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about your channel"
                        className="resize-none"
                        maxLength={150}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-xs">
                      This will appear when they visit your channel.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="step-2" className="flex flex-col gap-2">
              {/*Uploading Dropzone */}
              <p className="font-bold">Channel Cover</p>
              <div
                {...getRootProps()}
                className="relative border-2 border-dashed border-gray-300 focus:border-gray-800 px-5 pb-5 flex justify-center items-center rounded-md h-52"
              >
                <input {...getInputProps()} />
                {files.length > 0 && (
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      startUpload(files);
                    }}
                    disabled={isUploading}
                    className="z-20 absolute top-45 left-50"
                  >
                    <AiOutlineCloudUpload className="h-5 w-5" />
                    &nbsp;
                    <span className="truncate w-32">{files[0]?.name!}</span>
                  </Button>
                )}
                <p className="text-sm text-muted-foreground">
                  {files.length == 0 && "Drop your files here!"}
                </p>
              </div>

              {/* Private Channel */}
              <FormField
                control={form.control}
                name="private"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className=" font-bold">
                        Private Channel
                      </FormLabel>
                      <FormDescription className="text-xs">
                        This channel won&apos;t appear in the public.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={uploadedFile.length < 1 || isUploading}
              >
                Create a room
              </Button>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}

export default RoomForm;
