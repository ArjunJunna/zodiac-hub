'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const CreatePostButton = () => {
  const { data: session } = useSession();
  return (
    <Button variant="ghost" asChild>
      <Link href={`/z/${session?.user.id}/create`}>
        <Plus className="mr-2 h-4 w-4" />
        Create
      </Link>
    </Button>
  );
};

export default CreatePostButton;
