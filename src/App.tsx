import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './view/Login/Login';
import Home from './view/Home/Home';
import Register from './view/Login/Register';
import PrivateRoute from './Configs/privateRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  );
};

export default App;
