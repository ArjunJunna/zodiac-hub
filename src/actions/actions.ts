"use server";

import { z } from "zod";
import { BASE_URL } from "@/lib/Constants";
import { SigninFormSchema, SignupFormSchema } from "@/lib/schema";
import { publicRequest } from "@/requestMethods";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JSONContent } from "@tiptap/react";
import { redirect } from "next/navigation";
import { CommentType } from "@/utils/types";
import { revalidatePath, revalidateTag } from "next/cache";

type SigninInputs = z.infer<typeof SigninFormSchema>;
type SignupInputs = z.infer<typeof SignupFormSchema>;

export const postSignin = async (formData: SigninInputs) => {
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
        return { status: false, data: "Invalid Credentials" };
      }
    }
    if (result.error) {
      return { status: false, data: result.error.format() };
    }
  } catch (error) {
    return { status: false, data: "Invalid Credentials" };
  }
};

export const postSignup = async (formData: SignupInputs) => {
  const result = SignupFormSchema.safeParse(formData);
  try {
    if (result.success) {
      const { data } = result;

      const response = await publicRequest.post("/users", data);
      const { data: userData, status } = response;
      console.log(userData, status);
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

export const fetchUserData = async (userId: string) => {
  const session = await getServerSession(authOptions);
  try {
    console.log("userId");
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user data");
  }
};

type CreateForumType = {
  userId: string;
  imageUrl: string | null;
  description: string;
  communityName: string;
};

export const createForum = async (forumData: CreateForumType) => {
  const session = await getServerSession(authOptions);
  const data = {
    name: forumData.communityName,
    creatorId: forumData.userId,
    description: forumData.description,
    image: forumData.imageUrl,
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/forums`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
};

export const createPost = async (
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) => {
  const session = await getServerSession(authOptions);
  try {
    const forumId = formData.get("forumId") as string;
    const title = formData.get("title") as string;
    const image = formData.get("imageUrl") as string | null;
    const authorId = session?.user.id;
    const content = JSON.stringify(jsonContent);
    const postData = {
      forumId,
      title,
      image,
      authorId,
      ...(jsonContent && { content }),
    };
    const response = await axios.post(`${BASE_URL}/posts`, postData, {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};

export const handlePostVote = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return 404;
  }
  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as string;
  try {
    if (voteDirection == "UP") {
      const response = await axios.post(
        `${BASE_URL}/posts/${postId}/upvote`,
        { userId: session?.user.id, type: voteDirection },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      revalidatePath("/", "page");
      return response.status;
    } else {
      const response = await axios.delete(
        `${BASE_URL}/posts/${postId}/downvote`,
        {
          data: { userId: session?.user.id, type: voteDirection },
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      revalidatePath("/", "layout");
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};
export const handleCommentVote = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return 404;
  }
  const commentId = formData.get("commentId") as string;
  const voteDirection = formData.get("voteDirection") as string;
  try {
    if (voteDirection == "UP") {
      const response = await axios.post(
        `${BASE_URL}/comments/${commentId}/vote`,
        { userId: session?.user.id, type: voteDirection },
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      revalidatePath("/", "page");
      return response.status;
    } else {
      const response = await axios.delete(
        `${BASE_URL}/comments/${commentId}/vote`,
        {
          data: { userId: session?.user.id, type: voteDirection },
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      revalidatePath("/(routes)/post/[postId]", "page");
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleSubscription = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  const forumId = formData.get("forumId") as string;
  try {
    const { data, status } = await axios.post(
      `${BASE_URL}/forums/${forumId}/subscription`,
      { userId: session?.user.id },
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    
    revalidatePath(`/forums/${forumId}`);
    return { data, status };
  } catch (error) {
    console.log(error);
  }
};

export const fetchForumById = async (forumId: string) => {
  try {
    const session = await getServerSession(authOptions);
    const response = await axios.get(
      `${BASE_URL}/forums/${forumId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCommentsOnPostById = async (postId: string):Promise<CommentType[] | undefined> => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(
      `${BASE_URL}/posts/${postId}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data,session)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postComment=async(formData:FormData)=>{
  try {
    const session = await getServerSession(authOptions);
    const postId=formData.get('postId')
    const replyToId = formData.get("replyToId");
    const data={
      postId:formData.get('postId'),
      authorId:session?.user.id,
      text:formData.get('text'),
      replyToId:formData.get('replyToId')
    }
     const response = await axios.post(
       `${BASE_URL}/posts/${postId}/comment`,
       data,
       {
         headers: {
           Authorization: `Bearer ${session?.user.token}`,
         },
       }
     );
     revalidateTag('single-post');
     console.log('response',response);
   
     return response.status
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    const commentId = formData.get("commentId");
    const data = {
      userId:session?.user.id,
    };
  const response = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
    data: data,
  });
    revalidateTag("single-post");
    return response.status;
  } catch (error) {
    console.log(error);
  }
};