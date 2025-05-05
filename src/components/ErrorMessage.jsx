import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message = 'An error occurred. Please try again.' }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorMessage; 