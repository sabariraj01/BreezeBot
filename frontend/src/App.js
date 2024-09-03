import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthContext } from './context/AuthContext';
import ChatPage from './pages/ChatPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #1b1b1b, #444444);
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  main.container {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .card {
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 15px;
    padding: 2rem;
    color: #f0c040; /* Gold text color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
  }

  .gradientText {
    background: linear-gradient(90deg, #ff6f61, #ff4757);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }

  .infoText {
    margin-top: 2rem;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #d4af37; /* Lighter gold for informational text */
  }

  @media (max-width: 768px) {
    .gradientText {
      font-size: 2.5rem;
    }
    .infoText {
      font-size: 1rem;
    }
  }

  @media (max-width: 576px) {
    .gradientText {
      font-size: 2rem;
    }
    .infoText {
      font-size: 0.9rem;
    }
  }
`;


function App() {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <main className="container mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuth ? <Navigate to="/profile" /> : <LoginPage />} />
          <Route path="/register" element={isAuth ? <Navigate to="/profile" /> : <RegisterPage />} />
          <Route path="/chat" element={isAuth ? <ChatPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
