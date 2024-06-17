import { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

type AuthModalProps = {
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
};

const AuthModal = ({ setShowAuthModal }: AuthModalProps) => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div
      className="fixed z-40 flex justify-center items-center inset-0 bg-slate-900/[0.8]"
      onClick={(e) => {
        e.stopPropagation();
        setShowAuthModal(false);
      }}
    >
      <div
        className="flex flex-col rounded-md shadow-md bg-white dark:bg-gray-900 p-4 w-3/4 sm:w-2/3 md:1/3 lg:w-1/4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {showSignIn ? (
          <>
            <SignInForm
              setShowAuthModal={setShowAuthModal}
              setShowSignIn={setShowSignIn}
            />
          </>
        ) : (
          <>
            <SignUpForm
              setShowAuthModal={setShowAuthModal}
              setShowSignIn={setShowSignIn}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
