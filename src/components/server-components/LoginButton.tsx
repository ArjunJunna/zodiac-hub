"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import AuthModal from "../client-components/AuthModal";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/authContext";

const LoginButton = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { token } = useAuth()
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
