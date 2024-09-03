import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChatNow = () => {
    if (isAuth) {
      navigate('/chat'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div
      className="card p-4"
      style={{
        maxWidth: '700px',
        margin: 'auto',
        marginTop: '2rem',
        backgroundColor: 'black',
        color: 'gold',
        border: '2px solid gold',
        borderRadius: '20px',
      }}
    >
      {isAuth && user ? (
        <h3 className="gradientText text-center">
          Hello, <strong>{user.username}</strong>!
        </h3>
      ) : (
        <h2 className="gradientText text-center" style={{ color: 'gold' }}>
          Welcome User..!
        </h2>
      )}
      <div
        className="infoText mt-4 text-center"
        style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'white' }}
      >
        <p>
          <strong>BreezeBot</strong> is a <span style={{color:"red", fontWeight:"bold"}} > Mental Health Care Chatbot </span> and is here to provide you with a
          safe and supportive space to explore your feelings, get mental health advice, and find
          resources.
        </p>
        <p>
          Whether you're looking to talk, get guidance, or just need someone to listen,{' '}
          <strong style={{color:"red"}}>BreezeBot</strong> is available <span style={{color:"red", fontWeight:"bold"}} > 24/7 </span> to assist you with empathetic and personalized
          support.
        </p>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          style={{
            padding: '10px 30px',
            fontSize: '1rem',
            borderRadius: '20px',
            backgroundColor: 'gold',
            borderColor: 'gold',
            color: 'black',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'red')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'gold')}
          onClick={handleChatNow}
        >
          CHAT NOW
        </button>
      </div>
      <footer className="text-center mt-5">
        <p style={{ color: 'gold', fontSize: '1rem' }}>
          Created with ❤️ by <span style={{color:"red", fontWeight:"bold"}} > Sabari Raj ..! </span>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
