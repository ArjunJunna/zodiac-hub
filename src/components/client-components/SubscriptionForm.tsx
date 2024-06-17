'use client';

import React, { useState } from 'react';
import { SubscribeButton } from '@/components/client-components/SubmitButtons';
import { toast } from 'sonner';
import { handleSubscription } from '@/actions/actions';
import { useSession } from 'next-auth/react';
import AuthModal from './AuthModal';

type SubscribeProps = {
  forumId: string;
  initialText: string;
};

const SubscriptionForm = ({ forumId, initialText }: SubscribeProps) => {
  const { data: session } = useSession();
  const [buttonText, setButtonText] = useState(initialText);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleJoin = async (formData: FormData) => {
    if (session) {
      const response = await handleSubscription(formData);
      if (response?.status === 201) {
        toast(response?.data?.message);
        setButtonText(
          response?.data?.message === 'Subscribed' ? 'Leave' : 'Join'
        );
      }
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div>
      <form action={handleJoin}>
        <input type="hidden" name="forumId" value={forumId} />
        <SubscribeButton text={buttonText} />
      </form>
      {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
    </div>
  );
};

export default SubscriptionForm;
