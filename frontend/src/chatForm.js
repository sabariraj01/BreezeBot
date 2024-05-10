import './chatForm.css'
import React from 'react';

const Form = ({ handleSubmit, input, setInput }) => (
  <form className="form-container" onSubmit={handleSubmit}>
    <input 
      className="input-field"
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
      placeholder="Type your message..." 
    />
    <button className="submit-btn" type="submit">Send</button>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
  </form>
);

export default Form;
