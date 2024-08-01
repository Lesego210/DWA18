// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ShowDetail from './pages/ShowDetail';
import Favourites from './Favourites';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/show/:id" element={<ShowDetail />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  );
};

export default App;
