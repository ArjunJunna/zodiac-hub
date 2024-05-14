"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TiptapEditor from "@/components/client-components/TipTapEditor";
import { SubmitButton } from "@/components/client-components/SubmitButtons";
import { UploadDropzone } from "@/components/Uploadthing";
import { useState } from "react";
import { createPost } from "@/actions/actions";
import { JSONContent } from "@tiptap/react";

const CreatePost = ({ params }: { params: { id: string } }) => {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [title, setTitle] = useState<null | string>(null);
  const [json, setJson] = useState<null | JSONContent>(null);

  const createNewPost = createPost.bind(null, { jsonContent: json });
  const forumId = "48902296-8f55-4c6d-a21d-c8bb404e6863";

  return (
    <>
      <div className=" w-full p-2 h-full max-md:mx-3 border-l border-r">
        <div className="mx-auto flex gap-x-10 mt-4">
          <div className="w-[75%] flex flex-col gap-y-5">
            <h1 className="font-semibold">
              Create New Post
            </h1>
            <Tabs defaultValue="post" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="post">
                  <Text className="h-4 w-4 mr-2" /> Post
                </TabsTrigger>
                <TabsTrigger value="image">
                  <Video className="h-4 w-4 mr-2" />
                  Image & Video
                </TabsTrigger>
              </TabsList>
              <TabsContent value="post">
                <Card>
                  <form action={createNewPost}>
                    <input
                      type="hidden"
                      name="imageUrl"
                      value={imageUrl ?? undefined}
                    />
                    <input type="hidden" name="forumId" value={forumId} />
                    <CardHeader>
                      <Label>Title</Label>
                      <Input
                        required
                        name="title"
                        placeholder="Title"
                        value={title ?? ""}
                        onChange={e => setTitle(e.target.value)}
                      />

                      <TiptapEditor setJson={setJson} json={json} />
                    </CardHeader>
                    <CardFooter>
                      <SubmitButton text="Create Post" />
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="image">
                <Card>
                  <CardHeader>
                    {imageUrl === null ? (
                      <UploadDropzone
                        className="ut-button:bg-blue-600 ut-button:ut-readying:bg-blue-600/50 ut-label:text-primary ut-button:ut-uploading:bg-blue-600/50 ut-button:ut-uploading:after:bg-blue-600 ut-button:hover:cursor-pointer"
                        onClientUploadComplete={res => {
                          setImageUrl(res[0].url);
                        }}
                        endpoint="imageUploader"
                        onUploadError={() => toast.error("Error uploading image.Try again...!")}
                      />
                    ) : (
                      <Image
                        src={imageUrl}
                        alt="uploaded image"
                        width={500}
                        height={400}
                        className="h-80 rounded-lg w-full object-contain"
                      />
                    )}
                  </CardHeader>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
