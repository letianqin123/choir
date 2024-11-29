import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToLoginButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: '20px' }}>
      Back to Login
    </button>
  );
};

export default BackToLoginButton;