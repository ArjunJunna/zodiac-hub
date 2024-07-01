'use client';

import React, { useState } from 'react';
import AuthModal from './client-components/AuthModal';
import { Button } from './ui/button';

const SignInButton = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="space-x-2">
      <Button onClick={() => setShowAuthModal(true)}>Sign In</Button>
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </div>
  );
};

export default SignInButton;
