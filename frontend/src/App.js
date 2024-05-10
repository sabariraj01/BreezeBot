import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Test";
import AuthPage from "./authPage";
import AfterLogin from "./AfterLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<AfterLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
