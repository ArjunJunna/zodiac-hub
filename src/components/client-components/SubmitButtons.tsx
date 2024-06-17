'use client';

import { Button } from '@/components/ui/button';
import { Loader2, ArrowBigUp, ArrowBigDown, X } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ text }: { text: string }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">{text}</Button>
      )}
    </>
  );
};

export const UpVoteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled>
          <Loader2 className="h-6 w-6 animate-spin" />
        </button>
      ) : (
        <button className="mt-2 hover:text-green-400" type="submit">
          <ArrowBigUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export const DownVoteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled>
          <Loader2 className="h-6 w-6 animate-spin" />
        </button>
      ) : (
        <button className="mt-2 hover:text-red-400" type="submit">
          <ArrowBigDown className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

type SubscribeButtonProps = {
  text: string;
};

export const SubscribeButton = ({ text }: SubscribeButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled>
          <Loader2 className="h-6 w-6 animate-spin" />
        </button>
      ) : (
        <Button
          className="text-sm text-white py-1 px-2 rounded-md bg-gray-600/10 hover:bg-gray-300/70 dark:hover:bg-gray-700/40"
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
};

export const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button disabled>
          <Loader2 className="h-6 w-6 animate-spin" />
        </button>
      ) : (
        <button className="hover:text-red-400">
          <X className="h-6 w-6" />
        </button>
      )}
    </>
  );
};
