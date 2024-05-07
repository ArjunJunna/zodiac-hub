import { Dispatch, SetStateAction } from "react";
import { X, Upload } from "lucide-react";

type CreateForumModalProps = {
  setCreateForumModal: Dispatch<SetStateAction<boolean>>;
};

const CreateForumModal = ({ setCreateForumModal }: CreateForumModalProps) => {
  return (
    <div
      className="fixed z-40 flex h-full justify-center items-center inset-0 bg-slate-800/[0.7]"
      onClick={e => {
        e.stopPropagation();
        setCreateForumModal(false);
      }}
    >
      <form
        className="flex flex-col rounded-xl space-y-2 shadow-md bg-white dark:bg-gray-900 p-3 w-3/4 sm:w-2/3 md:1/3 lg:w-1/4"
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
        <div className="flex flex-col space-y-4">
          <div className="h-24 flex flex-col justify-center items-center border border-gray-300 w-full rounded-xl dark:border-gray-500">
            <Upload className="h-4 w-4 text-gray-500" />
            <p className="text-xs text-gray-500">Upload image here...</p>
          </div>
          <div>
            <label
              htmlFor="community noneame"
              className="block mb-2 text-sm font-medium text-gray-500 "
            >
              Community Name
            </label>
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
            <label
              htmlFor="community noneame"
              className="block mb-2 text-sm font-medium text-gray-500 "
            >
              Description
            </label>
            <textarea
              className="w-full break-all outline-none text-base mb-1.5 h-[10rem]   border  p-2 rounded-lg dark:bg-gray-700 bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
            dark:focus:border-blue-500 focus:border-blue-500"
              placeholder="Write description here..."
            ></textarea>
            {/*{errors.username?.message && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}*/}
          </div>

          <div className="flex justify-between gap-4">
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
