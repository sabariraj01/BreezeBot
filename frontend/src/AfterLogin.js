import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { AuthContext } from './context/AuthContext';
import botImage from './airobot.png';
import { FaPaperPlane } from 'react-icons/fa'; 


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  body {
    font-family: 'Orbitron', sans-serif;
    background-color: #000000; /* Black */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const Container = styled.div`
  display: flex;
  width: 90%;
  max-width: 1400px;
  height: 80vh;
  background-color: #1e1e1e; /* Dark grey */
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ChatSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: #1e1e1e; /* Dark grey */
`;

const DesignSection = styled.div`
  flex: 1;
  background: #dcd0c0; /* Sepia tone */
  color: #4a2c2a; /* Dark brown */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BotImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const BotName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #4a2c2a; /* Dark brown */
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #000000; /* Black */
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.2);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const ChatBubble = styled.div`
  background-color: ${(props) => (props.isUser ? '#00ffff' : '#333')}; /* Cyan or dark grey */
  color: ${(props) => (props.isUser ? '#000' : '#fff')};
  padding: 10px;
  border-radius: 20px;
  margin: 10px 0;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  box-shadow: 0 2px 5px rgba(0, 255, 255, 0.5);
  word-wrap: break-word;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 2px solid #00ffff; /* Cyan */
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  margin-right: 10px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 255, 255, 0.2);

  &:focus {
    border-color: #ff00ff; /* Neon pink */
  }
`;

const SubmitButton = styled.button`
  background-color: #000000; /* Cyan */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem; /* Adjust size as needed */
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #ff00c3; /* Neon pink */
  }
`;


const AfterLogin = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { user, isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const chatAreaRef = useRef(null);
  const email = user ? user.email : null;

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chats?email=${email}`, {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        });
        if (response.data && response.data.messages) {
          const chatHistory = response.data.messages.flatMap((msg) => [
            { content: msg.content, isUser: true, timestamp: new Date(msg.timestamp) },
            { content: msg.response, isUser: false, timestamp: new Date(msg.timestamp) },
          ]);
          setMessages(chatHistory.sort((a, b) => a.timestamp - b.timestamp));
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMessages([]);
        } else {
          console.error('Error fetching chat history:', err);
        }
      }
    };

    fetchMessages();
  }, [isAuth, email, navigate]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { content: input, isUser: true, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await axios.post('http://127.0.0.1:5000/chatbot_response', {
        message: input,
      });

      const botMessageContent = botResponse.data.response;

      const botMessage = {
        content: botMessageContent,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      await axios.post('http://localhost:5000/api/chats/save', {
        email,
        content: input,
        response: botMessageContent,
      },
      {
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
        withCredentials: true,
      });

      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = {
        content: 'An error occurred. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ChatSection>
          <ChatArea ref={chatAreaRef}>
            {messages.map((message, index) => (
              <ChatBubble key={index} isUser={message.isUser}>
                <p>{message.content}</p>
                <small>{new Date(message.timestamp).toLocaleString()}</small>
              </ChatBubble>
            ))}
          </ChatArea>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <SubmitButton type="submit">
              <FaPaperPlane />
            </SubmitButton>
          </FormContainer>
        </ChatSection>
        <DesignSection>
          <BotImage src={botImage} alt="bot" />
          <BotName>BreezeBot ..!</BotName>
        </DesignSection>
      </Container>
    </>
  );
};


export default AfterLogin;
