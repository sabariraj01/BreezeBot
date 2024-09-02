import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChatNow = () => {
    if (isAuth) {
      navigate('/chat'); // Navigate to Home if authenticated
    } else {
      navigate('/login'); // Navigate to Login if not authenticated
    }
  };

  return (
    <div className="card p-4" style={{ maxWidth: '700px', margin: 'auto', marginTop: '2rem' }}>
      
      {isAuth && user ? (
        <h3 className="gradientText text-center">
          Hello, <strong>{user.username}</strong>!
        </h3>
      ) : (
        <h2 className="gradientText text-center" >
          Welcome User
        </h2>
      )}
      <div className="infoText mt-4 text-center" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
        <p>
          <strong>BreezeBot</strong> is a Mental Health Care Chatbot and is here to provide you with a safe and supportive space to explore your 
          feelings, get mental health advice, and find resources.
        </p>
        <p>
          Whether you're looking to talk, get guidance, or just need someone to listen, <strong>BreezeBot</strong> is available
           24/7 to assist you with empathetic and personalized support.
        </p>
      </div>
      
      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          style={{ padding: '10px 30px', fontSize: '1rem', borderRadius: '20px' }}
          onClick={handleChatNow}
        >
          CHAT NOW
        </button>
      </div>
      <footer className="text-center mt-5">
        <p style={{ color: 'white', fontSize: '1rem' }}>
          Created with 💙 by Sabari Raj ..!
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
