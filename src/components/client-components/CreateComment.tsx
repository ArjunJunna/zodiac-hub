'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from './SubmitButtons';
import { postComment } from '@/actions/actions';
import { usePathname } from 'next/navigation';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  return (
    <form
      className="grid w-full gap-1.5 py-4"
      action={async (formData: FormData) => {
        const status = await postComment(formData);
        if (status == 201) {
          router.refresh();
          setInput('');
          toast.message('Comment created.');
        }
      }}
    >
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <input type="hidden" name="path" value={pathname} />
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="replyToId" value={replyToId} />
        <Textarea
          id="comment"
          name="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What are your thoughts?"
        />
        {input.length == 0 ? null : (
          <div className="mt-2 flex justify-end">
            <SubmitButton text="Post Comment" />
          </div>
        )}
      </div>
    </form>
  );
};

export default CreateComment;
