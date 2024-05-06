"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import AuthModal from "../client-components/AuthModal";
import useAuthModal from "@/hooks/useAuthModal";
import { cn } from "@/lib/utils";

const LoginButton = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { token } = useAuthModal();
  return (
    <>
      <Button
        className={cn(
          "rounded-2xl",
          token
            ? "hidden"
            : ""
        )}
        onClick={() => setShowAuthModal(true)}
      >
        Login
      </Button>
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </>
  );
};

export default LoginButton;
