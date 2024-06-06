import { X } from "lucide-react";
import { AuthFormProp } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { SigninFormSchema } from "@/lib/schema";
import { z } from "zod";
import { ButtonLoading } from "./LoadingButton";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof SigninFormSchema>;

const SignInForm = ({ setShowAuthModal, setShowSignIn }: AuthFormProp) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(SigninFormSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {

     const {username,password}=data;
     const response= await signIn("credentials", {
       username,
       password,
       redirect: false,
     });

     if (response?.status == 200) {
       toast.message("You are now signed in!");
     }

     if(response?.status==401){
     toast.error('Invalid user credentials!')
     }

     if (!response?.error) {
       router.push("/");
       router.refresh();
     }
  };

  const onGuestLogin = async () => {
    setValue("username", "guest");
    setValue("password", "guest");
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <form
        className="space-y-6"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
            dark:focus:border-blue-500
            "
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            required
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>
        {isSubmitting ? (
          <ButtonLoading className="w-full text-white bg-blue-600 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" />
        ) : (
          <>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Signin
            </button>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={()=>onGuestLogin()}
            >
              Guest Signin
            </button>
          </>
        )}

        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
          <span>Dont have an account?</span>
          <button
            onClick={() => setShowSignIn(prev => !prev)}
            className="text-blue-700 ml-4 hover:underline dark:text-blue-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
