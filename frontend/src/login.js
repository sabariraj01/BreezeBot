import React, { useState } from 'react';
import "./login.css"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    
    if(data.ok) {
      alert(data.message);
      window.location.href = '/home';
    } else {
      alert(data.message);
    }
  };

  return (
    <div className=''>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
