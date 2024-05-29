"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import AuthModal from "../client-components/AuthModal";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const LoginButton = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Button
        className={cn("rounded-2xl", session?.user.token ? "hidden" : "")}
        onClick={() => setShowAuthModal(true)}
      >
        Login
      </Button>
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </>
  );
};

export default LoginButton;
