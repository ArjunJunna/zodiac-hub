'use client';

import { usePathname } from 'next/navigation';
import PopularSection from './PopularSection';

const Info = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-16">
      {pathname.startsWith('/f') ? null : pathname === '/' ? (
        <PopularSection />
      ) : null}
    </div>
  );
};

export default Info;
