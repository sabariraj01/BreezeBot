import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import AuthPage from './authPage'; 
import ErrorMessage from './chatErrorMsg';
import ResponseMessage from './chatResponseMsg';
import Form from './chatForm';
import botImage from './airobot.png'


const AfterLogin = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/chatbot_response', { message: input });
      setResponse(res.data.response);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid email or password');
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      await axios.post('/auth/register', { username, email, password });
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to register user');
    }
  };

  // if (!isAuthenticated) { 
  //   return <AuthPage handleLogin={handleLogin} handleRegister={handleRegister} />;
  // }

  return (
    <>
      <header>
        <h1 className="app-title">Mental Health Care..</h1>
      </header>
    <div className="chat-container">
    <img src={botImage} alt="bot" className="bot-image" />
    <div className="container">
      <h1>Chatbot</h1>
      <Form className="form-container" handleSubmit={handleSubmit} input={input} setInput={setInput} />
      <ErrorMessage error={error} />
      <ResponseMessage response={response} />
    </div>
  </div>
  </>
  );
};

export default AfterLogin;
