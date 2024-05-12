import { X } from "lucide-react";
import { AuthFormProp } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { postSignup } from "../../actions/actions";
import { SignupFormSchema } from "@/lib/schema";
import { z } from "zod";
import { ButtonLoading } from "./LoadingButton";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

type Inputs = z.infer<typeof SignupFormSchema>;

const SignUpForm = ({ setShowAuthModal }: AuthFormProp) => {
   const {
     register,
     handleSubmit,
     watch,
     setValue,
     reset,
     formState: { errors, isSubmitting },
   } = useForm<Inputs>({
     resolver: zodResolver(SignupFormSchema),
   });
    const { setUserDetails } = useAuth();

   const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
     const result = await postSignup(data);

     if (result?.status == true) {
       if(result?.data?.status===409){
        toast.error(result.data.message);
       }else{
         localStorage.setItem("token", result?.data?.token);
         localStorage.setItem("userId",result?.data?.id);
         setUserDetails(result?.data);
         setShowAuthModal(false);
         toast.success("You are signed up.");
       }
     } else {
       reset();
       toast.error("Something went wrong");
     }
   }
  return (
    <>
      <form
        className="space-y-2"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
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
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
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
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="e.g. tomcruise@gmail.com"
            required
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            required
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>
        {/*<div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            name="confirmPwd"
            required
          />
      </div>*/}
        <div>
          {false ? (
            <div className="text-xs text-red-600">Passwords do not match</div>
          ) : null}
        </div>
        {isSubmitting ? (
          <ButtonLoading className="w-full text-white bg-blue-600 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" />
        ) : (
          <button
            className="w-full text-white bg-blue-600 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            type="submit"
          >
            Create New Account
          </button>
        )}

        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
          <span>Already have an account?</span>
          <Link
            href="/api/auth/signin"
            //onClick={() => setShowSignIn(prev => !prev)}
            className="text-blue-700 ml-4 hover:underline dark:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </>
  ); 
};

export default SignUpForm