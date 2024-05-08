import { useAuth } from "@/context/authContext";
import { useState } from "react";

const useAuthModal = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const {userDetails}=useAuth()

  const joinForum = () => {
    
    if (!userDetails?.token) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
      // Join Forum Logic
    }
  };
  const votePost = () => {
    if (!userDetails?.token) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
      // Vote Post Logic
    }
  };

  return {
    showAuthModal,
    setShowAuthModal,
    joinForum,
    votePost,
  };
};

export default useAuthModal;
