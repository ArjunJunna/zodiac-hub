"use client";

import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import { UploadDropzone } from "../Uploadthing";
import { CreateForumSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

type CreateForumModalProps = {
  setCreateForumModal: Dispatch<SetStateAction<boolean>>;
};

type Inputs = z.infer<typeof CreateForumSchema>;

const CreateForumModal = ({ setCreateForumModal }: CreateForumModalProps) => {
   const {
     register,
     handleSubmit,
     watch,
     setValue,
     reset,
     formState: { errors, isSubmitting },
   } = useForm<Inputs>({
     resolver: zodResolver(CreateForumSchema),
     defaultValues:{
      image:"",
      communityName:"",
      description:""
     }
   });
  const [imageUrl, setImageUrl] = useState("");
  return (
    <div
      className="fixed z-40 flex h-full justify-center items-center inset-0 bg-slate-800/[0.7]"
      onClick={e => {
        e.stopPropagation();
        setCreateForumModal(false);
      }}
    >
      <form
        className="flex flex-col rounded-xl space-y-1 shadow-md bg-white dark:bg-gray-900 p-[10px] w-3/4 sm:w-2/3 md:1/3 lg:w-1/4"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center">
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
        <div className="flex flex-col space-y-2.5">
          <div className="h-fit flex flex-col justify-center items-center border w-full rounded-xl pt-0 px-2 pb-2 dark:border-gray-500">
            <UploadDropzone
              className="h-[14rem] ut-button:h-8 ut-upload-icon:h-6 ut-upload-icon:w-6 ut-button:bg-blue-600 ut-button:ut-readying:bg-blue-600/50 ut-label:text-primary ut-button:ut-uploading:bg-blue-600/50 ut-button:ut-uploading:after:bg-blue-600 ut-button:hover:cursor-pointer"
              endpoint="imageUploader"
              onClientUploadComplete={res => {
                console.log("from dropzone", res);
                setImageUrl(res[0].url);
              }}
              onUploadError={(error: Error) => {
                alert("Error");
              }}
            />
          </div>
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
            dark:focus:border-blue-500
            "
              required
              placeholder="Community Name"
              //{...register("username")}
            />
            {/*{errors.username?.message && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}*/}
          </div>
          <div>
            <textarea
              className="w-full break-all outline-none text-base mb-1.5 h-[10rem]   border  p-2 rounded-lg dark:bg-gray-700 bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
            dark:focus:border-blue-500 focus:border-blue-500"
              placeholder="Write description here..."
            ></textarea>
            {/*{errors.username?.message && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}*/}
          </div>

          <div className="flex justify-between gap-x-4">
            <button
              type="button"
              className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-gray-900 hover:text-white dark:text-white dark:hover:text-white hover:bg-blue-800"
              onClick={() => setCreateForumModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-600 rounded-lg py-1 px-5 font-medium text-white hover:bg-blue-800"
              onClick={() => {
                setCreateForumModal(false);
              }}
            >
              Create Community
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateForumModal;
