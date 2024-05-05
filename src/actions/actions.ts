"use server"
import { z } from "zod";

import { SigninFormSchema ,SignupFormSchema} from "@/lib/schema";
import { publicRequest } from "@/requestMethods";
import axios from "axios";
type SigninInputs = z.infer<typeof SigninFormSchema>;
type SignupInputs = z.infer<typeof SignupFormSchema>;

export const postSignin=async(formData:SigninInputs)=>{
  
        const result = SigninFormSchema.safeParse(formData);
        if (result.success) {
            const {data}=result
            const response = await publicRequest.post(
              "/auth/login",
              data
            );
            const { data:dataToken, status } = response;
            if(status===201){
               return { success: true, data: dataToken };
            }
        }
        if (result.error) {
          return { success: false, error: result.error.format() };
        }
}

export const postSignup = async (formData: SignupInputs) => {
  const result = SignupFormSchema.safeParse(formData);
  if (result.success) {
    const { data } = result;
     const response = await publicRequest.post("/users", data);
    const { data: userData, status } = response;
    if (status === 201) {
      return { success: true, data: userData };
    }
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

