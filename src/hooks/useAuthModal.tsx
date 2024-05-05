import { useState } from "react";

const useAuthModal = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const token = localStorage.getItem("token");

  const joinForum = () => {
    
    if (!token) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
      // Join Forum Logic
    }
  };
  const votePost = () => {
    if (!token) {
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
    token
  };
};

export default useAuthModal;
