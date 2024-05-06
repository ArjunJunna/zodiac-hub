"use server"
import { z } from "zod";

import { SigninFormSchema ,SignupFormSchema} from "@/lib/schema";
import { publicRequest } from "@/requestMethods";
type SigninInputs = z.infer<typeof SigninFormSchema>;
type SignupInputs = z.infer<typeof SignupFormSchema>;

export const postSignin=async(formData:SigninInputs)=>{
  
        const result = SigninFormSchema.safeParse(formData);
        try {
           if (result.success) {
               const { data } = result;
               
               const response = await publicRequest.post("/auth/login", data);
               const { data: dataToken, status } = response;
               if (status === 201) {
                 return { status: true, data: dataToken };
               }
               if (status === 401) {
                 return { status: false, data: "Invalid Credentials"};
               }
           } 
           if(result.error){
             return {status:false,data:result.error.format()}
           }
        } catch (error) {
          return { status: false, data: "Invalid Credentials" };
        }
}

export const postSignup = async (formData: SignupInputs) => {
 
    const result = SignupFormSchema.safeParse(formData);
    try {
      if (result.success) {
        const { data } = result;

        const response = await publicRequest.post("/users", data);
        const { data:userData,status } = response;
        console.log(userData,status)
        if (status === 201) {
          return { status: true, data: userData };
        }
      }
      if (result.error) {
        return { status: false, data: result.error.format() };
      }
    } catch (error) {
      return { status: false, data: "Invalid Credentials" };
    }
};

