"use client";

import React, { useState } from "react";
import { SubscribeButton } from "@/components/client-components/SubmitButtons";
import { toast } from "sonner";
import { handleSubscription } from "@/actions/actions";

type SubscribeProps = {
  forumId: string;
  initialText: string;
};

const SubscriptionForm = ({ forumId, initialText }: SubscribeProps) => {
  const [buttonText, setButtonText] = useState(initialText);
  const handleJoin = async (formData: FormData) => {
    const response = await handleSubscription(formData);
    if (response?.status === 201) {
      toast(response?.data?.message);
      setButtonText(
        response?.data?.message === "Subscribed" ? "Leave" : "Join"
      );
    }
  };

  return (
    <form action={handleJoin}>
      <input type="hidden" name="forumId" value={forumId} />
      <SubscribeButton text={buttonText} />
    </form>
  );
};

export default SubscriptionForm;
