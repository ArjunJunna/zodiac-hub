import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "2MB" ,maxFileCount:1} })

    .onUploadComplete(async ({  file }) => {
      console.log("File upload complete.", file.url);
      //return { };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
