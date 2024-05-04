"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import AuthModal from "../client-components/AuthModal";

const LoginButton = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <>
      <Button className="rounded-2xl" onClick={() => setShowAuthModal(true)}>
        Login
      </Button>
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </>
  );
};

export default LoginButton;
