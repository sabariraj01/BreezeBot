import React from 'react';
import './chatResponseMsg.css'; 

const ResponseMessage = ({ response }) => response && <div className="response">{response}</div>;

export default ResponseMessage;


// import React from 'react';
// import './chatResponseMsg.css';

// const ResponseMessage = ({ response }) => {
//   return (
//     <div className="response-container">
//       <img src="avatar.png" alt="Avatar" className="avatar" />
//       <div className="response-message">
//         <p>{response}</p>
//       </div>
//     </div>
//   );
// };

// export default ResponseMessage;