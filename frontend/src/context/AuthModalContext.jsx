import React, { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext(null);

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState('login'); // 'login' | 'register' | 'forgotPassword' | 'verifyCode' | 'resetPassword'

  const openLogin = () => {
    setAuthModalType('login');
    setIsAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthModalType('register');
    setIsAuthModalOpen(true);
  };

  const openForgotPassword = () => {
    setAuthModalType('forgotPassword');
    setIsAuthModalOpen(true);
  };

  const openVerifyCode = () => {
    setAuthModalType('verifyCode');
    setIsAuthModalOpen(true);
  };

  const openResetPassword = () => {
    setAuthModalType('resetPassword');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{
      isAuthModalOpen,
      authModalType,
      setAuthModalType,
      openLogin,
      openRegister,
      openForgotPassword,
      openVerifyCode,
      openResetPassword,
      closeAuthModal
    }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
