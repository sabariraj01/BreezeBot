import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    };
  
    return (
      <div className=''>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input className='input' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
          <input className='input' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input className='input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button className='button' type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default Register;