# ✨ BreezeBot ✨

BreezeBot is a comprehensive Mental-Health-Care Chatbot designed to provide empathetic and personalized support to users. It offers a safe space for individuals to explore their feelings, receive mental health advice, and find valuable resources. The bot is available 24/7, ensuring that users always have access to help whenever they need it.

## 📋 Table of Contents

- [✨ Features](#-features)
- [💻 Technologies Used](#-technologies-used)
- [⚙️ Setup and Installation](#%EF%B8%8F-setup-and-installation)
- [🚀 Usage](#-usage)
- [📂 API Endpoints](#-api-endpoints)
- [📁 Project Structure](#-project-structure)
- [📸 Sample Images](#-sample-images)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **🔒 User Authentication:** Secure registration, login, and password management with JWT-based authentication.
- **💬 Chat Functionality:** Real-time chat with the BreezeBot, which offers mental health advice and resources.
- **📝 Chat History:** User chat history is saved and can be retrieved at any time.
- **🔑 Password Management:** Secure password storage with bcrypt, including password history to prevent reuse.
- **🔐 OTP-based Password Reset:** Users can reset their passwords securely using an OTP sent to their email.
- **🤖 AI/ML Integration:** The bot utilizes natural language processing (NLP) and machine learning (ML) to understand user inputs and provide relevant responses.

## 💻 Technologies Used

### Backend

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and chat history.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt.js**: For hashing passwords and managing password history.
- **Winston**: For logging server events.
- **Flask**: Python-based backend for the chatbot AI/ML model.
- **Keras**: Deep learning framework used for training the chatbot model.
- **NLTK**: Natural Language Toolkit for processing text inputs.

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **Bootstrap**: CSS framework for responsive design.
- **Styled Components**: For writing CSS in JS with styled-components.
- **React Router**: For routing in the React app.

## ⚙️ Setup and Installation

### Prerequisites

- Node.js and npm installed
- Python and pip installed
- MongoDB installed and running

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/sabariraj01/BreezeBot.git
    cd BreezeBot
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT = 5000
    MONGO_URI = mongodb://localhost:27017/chatbot
    JWT_SECRET = your_secret_key
    NODE_ENV = production
    EMAIL_USER = your_email@gmail.com
    EMAIL_PASS = your_email_password
    API_KEY = your_api_key
    FRONTEND_URL = http://localhost:3000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

2. Create a `.env` file in the `frontend` directory and add the following:
    ```env
    REACT_APP_API_URL = http://localhost:5000
    REACT_APP_API_KEY = your_api_key
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

### AI/ML Model Setup

1. Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

2. Train the chatbot model (if needed):
    ```bash
    python bot_creation.py
    ```

3. Start the Flask server:
    ```bash
    python app.py
    ```

## 🚀 Usage

1. Open your browser and go to `http://localhost:3000`.
2. Register or log in to start chatting with BreezeBot.
3. Explore the chat history, reset passwords, and more using the provided features.

## 📂 API Endpoints

### User Routes

- **POST /api/users/register:** Register a new user.
- **POST /api/users/login:** Log in a user.
- **POST /api/users/logout:** Log out the current user.
- **GET /api/users/profile:** Get the profile of the logged-in user.
- **PUT /api/users/profile:** Update the profile of the logged-in user.
- **POST /api/users/forgotpassword:** Request a password reset OTP.
- **PUT /api/users/resetpassword:** Reset the password using the OTP.

### Chat Routes

- **POST /api/chats/save:** Save a chat message.
- **GET /api/chats:** Retrieve chat messages for a specific user.

## 📁 Project Structure

BreezeBot/ 

└── backend/ 

  ├── config/ # Database and logger configuration 

  ├── controllers/ # Route handlers for user and chat functionalities 
  ├── middleware/ # Custom middleware functions (auth, API key, error handling) 
  ├── models/ # Mongoose models for User and Chat
  ├── routes/ # Express routes for user and chat APIs 
  ├── utils/ # Utility functions (logger) 
  ├── .env # Environment variables 
  └── server.js # Main server file 
  
└──  frontend/ 
  ├── public/ # Public assets 
  ├── src/ # React components, context, and pages
      ├── components
      ├── context
      ├── pages
      └── App.js # Main React app file
  └── .env # Environment variables for frontend
  
  
└──  Cbot/ 
  ├── app.py # Flask server for the chatbot 
  ├── bot_creation.py # Script to create and train the chatbot model 
  ├── data/
        └── dataset.json # Training data for the chatbot 
  ├── texts.pkl # Preprocessed words (pickle) 
  ├── labels.pkl # Labels for intents (pickle)
  └── model.h5 # Trained Keras model 
  
└── LICENSE
└── README.md


## 📸 Sample Images

- **Home Page:** A screenshot of the home page.
- **Chat Interface:** A screenshot of the chat interface.
- **Login/Register:** Screenshots of the login and registration forms.
- **Chatbot in Action:** A screenshot showing the chatbot responding to a user query.

![Home Page](./sample-images/home-page.png)
![Chat Interface](./sample-images/chat-interface.png)
![Login](./sample-images/login.png)
![Register](./sample-images/register.png)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
