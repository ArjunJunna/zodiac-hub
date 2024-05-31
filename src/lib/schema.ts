import { z } from "zod";

export const SigninFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const SignupFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  email: z.string().min(5, {
    message: "Email is must and be at least 5 characters.",
  }),
});

export const CreateForumSchema = z.object({
  communityName: z.string().min(1, {
    message: "Must have a name.",
  }),
  description: z
    .string()
    .min(1, {
      message: "Must have description",
    })
    .max(1000, { message: "Description must have be at max 1000 characters." }),
});

export const CreatePostSchema = z.object({
  forumId: z.string().min(1, {
    message: "Forum is must.",
  }),
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  imageUrl: z.string().optional()
});

export const CommentValidator = z.object({
  postId: z.string(),
  text: z.string(),
  replyToId: z.string().optional(),
});

export type CommentRequest = z.infer<typeof CommentValidator>;
