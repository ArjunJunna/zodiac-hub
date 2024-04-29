"use client"

import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

type ChildrenProp = {
  children: ReactNode;
};

const Hydration = ({ children }: ChildrenProp) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default Hydration;
