"use client";

import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import { UploadDropzone } from "../Uploadthing";
import { CreateForumSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonLoading } from "./LoadingButton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/authContext";
import { userRequest } from "@/requestMethods";

type CreateForumModalProps = {
  setCreateForumModal: Dispatch<SetStateAction<boolean>>;
};

type Inputs = z.infer<typeof CreateForumSchema>;

const CreateForumModal = ({ setCreateForumModal }: CreateForumModalProps) => {
   const {
     register,
     handleSubmit,
     formState: { errors, isSubmitting },
   } = useForm<Inputs>({
     resolver: zodResolver(CreateForumSchema),
   });
   const {userDetails:{id:userId}}=useAuth()
  const [imageUrl, setImageUrl] = useState("");
  type CreateForumType = {
    userId: string;
    imageUrl: string;
    description: string;
    communityName: string;
  };
   const createForum=async(forumData:CreateForumType)=>{
const data = {
  name: forumData.communityName,
  creatorId: forumData.userId,
  description: forumData.description,
  image: forumData.imageUrl,
};
try {
  const response = await userRequest.post(`/forums`, data);
  return response.data;
} catch (error) {
  console.log(error);
}
}
   const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    if(imageUrl!==''){
      const postData={imageUrl,userId,...data}
      const result=await createForum(postData);
    }
   };
  return (
    <div
      className="fixed z-40 flex justify-center items-center inset-0 bg-slate-900/[0.8]"
      onClick={e => {
        e.stopPropagation();
        setCreateForumModal(false);
      }}
    >
      <div
        className="flex flex-col rounded-md shadow-md bg-white dark:bg-gray-900 p-2 w-3/4 sm:w-2/3 md:1/3 lg:w-1/4"
        onClick={e => e.stopPropagation()}
      >
        <form
          className="space-y-0.5 mb-0"
          onSubmit={e => {
            e.preventDefault();
            console.log("till here");
            handleSubmit(onSubmit)();
          }}
        >
          <div className="flex justify-between items-center ">
            <h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
              Name your community
            </h5>
            <div
              className="cursor-pointer bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40 p-[6px] rounded-full"
              onClick={() => setCreateForumModal(false)}
            >
              <X />
            </div>
          </div>
          <div className="flex flex-col space-y-2.5  ">
             <div className="h-fit flex flex-col justify-center items-center border border-white w-full rounded-xl pt-0 px-2 pb-2 dark:border-gray-500">
              <UploadDropzone
                className="h-[14rem] ut-button:h-8 ut-upload-icon:h-6 ut-upload-icon:w-6 ut-button:bg-blue-600 ut-button:ut-readying:bg-blue-600/50 ut-label:text-primary ut-button:ut-uploading:bg-blue-600/50 ut-button:ut-uploading:after:bg-blue-600 ut-button:hover:cursor-pointer"
                endpoint="imageUploader"
                onClientUploadComplete={res => {
                  setImageUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  toast.error("Image could not be uploaded. Try again");
                }}
              
              />
            </div>
            {imageUrl === "" && (
              <p className="text-sm text-red-400">Uploading image is must.</p>
            )}
            <div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
            dark:focus:border-blue-500
            "
                required
                placeholder="Community Name"
                {...register("communityName")}
              />
              {errors?.communityName?.message && (
                <p className="text-sm text-red-400">
                  {errors?.communityName?.message}
                </p>
              )}
            </div>
            <div>
              <textarea
                className="w-full break-all outline-none text-base mb-1.5 h-[10rem]   border  p-2 rounded-lg dark:bg-gray-700 bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
            dark:focus:border-blue-500 focus:border-blue-500"
                placeholder="Write description here..."
                {...register("description")}
              ></textarea>
              {errors?.description?.message && (
                <p className="text-sm text-red-400">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-x-4">
              <button
                type="button"
                className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-gray-900 hover:text-white dark:text-white dark:hover:text-white hover:bg-blue-800"
                onClick={e => {
                  e.stopPropagation();
                  setCreateForumModal(false);
                }}
              >
                Cancel
              </button>
              {isSubmitting ? (
                <ButtonLoading className="w-full text-white bg-blue-600 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" />
              ) : (
                <button
                  type="submit"
                  className={cn(
                    "bg-blue-600 rounded-lg py-1 px-5 font-medium text-white hover:bg-blue-800",
                    imageUrl === "" ? "cursor-not-allowed" : ""
                  )}
                  disabled={!imageUrl}
                >
                  Create Community
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForumModal;
