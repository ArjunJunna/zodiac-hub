import { X } from "lucide-react";
import { AuthFormProp } from "@/utils/types";


const SignUpForm = ({ setShowAuthModal, setShowSignIn }: AuthFormProp) => {
  return (
    <>
      <form className="space-y-2">
        <div className="flex justify-between">
          <h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Sign Up
          </h5>
          <div
            className="cursor-pointer bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40 p-[6px] rounded-full"
            onClick={() => setShowAuthModal(false)}
          >
            <X />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="fullName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g. Tom Cruise"
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g. tomcruise"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            name="confirmPwd"
            required
          />
        </div>
        <div>
          {false ? (
            <div className="text-xs text-red-600">Passwords do not match</div>
          ) : null}
        </div>
        <button
          className="w-full text-white bg-orange-600 hover:bg-orange-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700"
          type="submit"
        >
          Create New Account
        </button>

        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
          <span>Already have an account?</span>
          <button
            onClick={() => setShowSignIn(prev => !prev)}
            className="text-orange-700 ml-4 hover:underline dark:text-orange-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  ); 
};

export default SignUpForm