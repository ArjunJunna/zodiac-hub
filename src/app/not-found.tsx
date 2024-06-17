import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="w-full flex justify-center items-center p-2 h-full max-md:mx-3 border-l border-r">
      <div className="flex flex-col items-center space-y-1">
        <Image
          alt="Zodiac-logo"
          src="/zodiac-logo.png"
          width={200}
          height={200}
        />
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <Button variant="link" asChild>
          <Link href={`/`}>Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
