"use server"
import { z } from "zod";
import {BASE_URL, userRequest} from '@/requestMethods'

import { SigninFormSchema ,SignupFormSchema} from "@/lib/schema";
import { publicRequest } from "@/requestMethods";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
type SigninInputs = z.infer<typeof SigninFormSchema>;
type SignupInputs = z.infer<typeof SignupFormSchema>;

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const postSignin=async(formData:SigninInputs)=>{
  
        const result = SigninFormSchema.safeParse(formData);
        try {
           if (result.success) {
               const { data } = result;
               
               const response = await publicRequest.post("/auth/login", data);
               const { data: userDetails, status } = response;
               if (status === 201) {
                 return { status: true, data: userDetails };
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

export const fetchUserData = async (userId:string) => {
  const session =await getServerSession(authOptions)
  try {
    console.log('userId');
    const response = await axios.get(
      `${BASE_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    console.log("your user response", response);
    return response.data; 
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user data");
  }
};

type CreateForumType={
  userId:string;
  imageUrl:string;
  description:string;
  communityName:string;
}

export const createForum=async(forumData:CreateForumType)=>{
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
