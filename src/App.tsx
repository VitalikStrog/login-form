import React from "react";
import "./assets/styles/index.scss";
import { LoginForm } from "./components/LoginForm";
import { HashRouter, Route, Routes } from "react-router-dom";
import { SignupForm } from "./components/SignupForm";
import { HomePage } from "./components/HomePage";
import { ForgotPassForm } from "./components/ForgotPassForm";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPassForm />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
