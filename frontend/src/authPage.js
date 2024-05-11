import React, { useState } from 'react';
import Login from './login';
import Register from './register';
import './login.css'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <button className='buttonreg' onClick={toggleAuthMode}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
    </div>
  );
};

export default AuthPage;
