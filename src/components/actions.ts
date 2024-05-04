"use server"
import { z } from "zod";

import { SigninFormSchema } from "@/lib/schema";
type Inputs = z.infer<typeof SigninFormSchema>;

export const postSignup=async(formData:Inputs)=>{
  
        const result = SigninFormSchema.safeParse(formData);
        if (result.success) {
            // ADD AUTH LOGIC HERE
          return { success: true, data: result.data };
        }

        if (result.error) {
            console.log('see this',result.error.format())
          return { success: false, error: result.error.format() };
        }

    
}