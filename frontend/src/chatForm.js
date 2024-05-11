import './chatForm.css'
import React from 'react';

const Form = ({ handleSubmit, input, setInput }) => (
  <form className="form-container" onSubmit={handleSubmit}>
    <input 
      className="input-field"
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
      placeholder="Type your query..." 
    />
    <button className="submit-btn" type="submit">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 24 24" fill="black">
        <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
      </svg>
    </button>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
  </form>
);

export default Form;
