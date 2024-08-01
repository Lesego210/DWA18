// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import PodcastProvider from './context/PodcastContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PodcastProvider>
      <App />
    </PodcastProvider>
  </BrowserRouter>
);