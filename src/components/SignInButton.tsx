"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import AuthModal from "./client-components/AuthModal";
import { Button } from "./ui/button";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log('from signin button',{ session });
   const [showAuthModal, setShowAuthModal] = useState(false);

  if (session)
    return (
      <div className="flex gap-4 ml-auto">
        <Button asChild>
          <Link href="/api/auth/signout">Sign Out</Link>
        </Button>
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
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
