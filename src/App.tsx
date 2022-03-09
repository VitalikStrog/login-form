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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
