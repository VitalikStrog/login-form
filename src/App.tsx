import React from "react";
import "./assets/styles/index.scss";
import { LoginForm } from "./components/LoginForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignupForm} from "./components/SignupForm";
import {HomePage} from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login-form" element={<HomePage />} />
          <Route path="/login-form/login" element={<LoginForm />} />
          <Route path="/login-form/sign-up" element={<SignupForm />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
