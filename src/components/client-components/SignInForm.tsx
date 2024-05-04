import { X } from "lucide-react";
import { AuthFormProp } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { postSignup } from "../actions";
import { SigninFormSchema } from "@/lib/schema";
import { z } from "zod";

type Inputs = z.infer<typeof SigninFormSchema>;

const SignInForm = ({ setShowAuthModal, setShowSignIn }: AuthFormProp) => {
     
      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm<Inputs>({
        resolver: zodResolver(SigninFormSchema),
      });
   
      const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        try {
          const result = await postSignup(data);
          if (!result) {
            console.log("Something went wrong");
            return;
          }

          if (result.error) {
            console.log(result.error);
            return;
          }
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      };
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <h5 className="text-xl font-medium text-center text-gray-900 dark:text-white">
            Sign In
          </h5>
          <div
            className="cursor-pointer bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40 p-[6px] rounded-full"
            onClick={() => setShowAuthModal(false)}
          >
            <X />
          </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="e.g. tomcruise"
            required
            {...register("username")}
          />
          {errors.username?.message && (
            <p className="text-sm text-red-400">{errors.username.message}</p>
          )}
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
            
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-orange-600 hover:bg-orange-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700"
        >
          Login
        </button>
        <button
          type="submit"
          className="w-full text-orange-600 hover:text-white border border-orange-600 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-500 dark:text-white dark:hover:text-white dark:hover:bg-orange-700 hover:bg-orange-700"
          onClick={() => {}}
        >
          Login as Guest
        </button>
        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
          <span>Dont have an account?</span>
          <button
            onClick={() => setShowSignIn(prev => !prev)}
            className="text-orange-700 ml-4 hover:underline dark:text-orange-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
