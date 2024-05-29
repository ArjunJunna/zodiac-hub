"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postComment } from "@/actions/actions";
import { SubmitButton } from "./SubmitButtons";
import { revalidatePath } from "next/cache";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
  onCommentCreated?: () => void;
}

const CreateComment= ({
  postId,
  replyToId,
  onCommentCreated,
}:CreateCommentProps) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();


  return (
    <div>
      <form
        className="grid w-full gap-1.5"
        action={async (formData: FormData) => {
          const status = await postComment(formData);
          if (status == 201) {
            router.refresh();
            setInput("");
            toast.message("Comment created.");
            revalidatePath(`/post/${postId}`);
            //onCommentCreated();
          }
        }}
      >
        <Label htmlFor="comment">Your comment</Label>
        <div className="mt-2">
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="replyToId" value={replyToId} />
          <Textarea
            id="comment"
            name="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="What are your thoughts?"
          />
          {input.length == 0 ? null : (
            <div className="mt-2 flex justify-end">
              <SubmitButton text="Post Comment" />
            </div>
          )}
        </div>
      </form>
     
    </div>
  );
};

export default CreateComment;
