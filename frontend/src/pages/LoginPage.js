import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState('forgotPassword'); // forgotPassword, resetPassword
  const [loading, setLoading] = useState(false);
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(process.env.REACT_APP_API_URL)
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        { email, password },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );
      login(data);
      navigate('/chat');
    } catch (error) {
      console.log(error,process.env.REACT_APP_API_URL)
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/forgotpassword`,
        { email },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );
      setMessage(data.message);
      setError(null);
      setModalStep('resetPassword');
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to send OTP.'
      );
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/resetpassword`,
        {
          email,
          otp: otpString,
          newPassword,
        },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
          },
          withCredentials: true,
        }
      );
      setMessage(data.message);
      setError(null);
      setTimeout(() => {
        setShowModal(false);
        setModalStep('forgotPassword');
      }, 3000);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to reset password.'
      );
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStep('forgotPassword');
    setMessage(null);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-light" style={{ color: '#007bff' }}>Login</h2>
      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={handleLogin} className="mx-auto shadow p-4 rounded bg-light" style={{ maxWidth: '400px', border: '2px solid #007bff' }}>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#007bff' }}>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderColor: '#007bff', borderWidth: '2px' }}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label style={{ fontWeight: 'bold', color: '#007bff' }}>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderColor: '#007bff', borderWidth: '2px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary d-block mx-auto mt-4" style={{ backgroundColor: '#007bff', borderColor: '#007bff', fontWeight: 'bold' }}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </button>
        <p className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setShowModal(true)}
            style={{ color: '#007bff', fontWeight: 'bold' }}
          >
            Forgot Password?
          </button>
        </p>
      </form>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#007bff', fontWeight: 'bold' }}>
            {modalStep === 'forgotPassword' ? 'Forgot Password' : 'Reset Password'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <div className="alert alert-success text-center">{message}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {modalStep === 'forgotPassword' && (
            <form onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#007bff' }}>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderColor: '#007bff', borderWidth: '2px' }}
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary d-block mx-auto mt-4" style={{ backgroundColor: '#007bff', borderColor: '#007bff', fontWeight: 'bold' }}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Send OTP'}
              </button>
            </form>
          )}

          {modalStep === 'resetPassword' && (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#007bff' }}>OTP:</label>
                <div className="d-flex justify-content-between">
                  {otp.map((data, index) => (
                    <input
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="form-control text-center"
                      style={{ width: '3rem', marginRight: '0.5rem', borderColor: '#007bff', borderWidth: '2px' }}
                    />
                  ))}
                </div>
              </div>
              <br></br>
              <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#007bff' }}>New Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  style={{ borderColor: '#007bff', borderWidth: '2px' }}
                />
              </div>
              <br></br>
              <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#007bff' }}>Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                  style={{ borderColor: '#007bff', borderWidth: '2px' }}
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary d-block mx-auto mt-4" style={{ backgroundColor: '#007bff', borderColor: '#007bff', fontWeight: 'bold' }}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
              </button>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
