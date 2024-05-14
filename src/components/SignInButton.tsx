"use client";

import Link from "next/link";
import React, { useState } from "react";
import AuthModal from "./client-components/AuthModal";
import { Button } from "./ui/button";

const SignInButton = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div >
      <Button asChild>
        <Link href="/api/auth/signin">Sign In</Link>
      </Button>
      <Button
        variant="ghost"
        onClick={() => setShowAuthModal(true)}
        className=" text-green-600 "
      >
        Sign Up
      </Button>
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </div>
  );
};

export default SignInButton;
