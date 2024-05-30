"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LatestDataOnMount = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return null;
};

export default LatestDataOnMount;
