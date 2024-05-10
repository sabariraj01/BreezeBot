import React from 'react';
import './chatErrorMsg.css'; 

const ErrorMessage = ({ error }) => error && <div className="error">{error}</div>;

export default ErrorMessage;
