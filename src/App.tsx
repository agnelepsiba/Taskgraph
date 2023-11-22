import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './modules/login/login';
import HomePage from './modules/home';
import "./styles/variables.scss";
function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
