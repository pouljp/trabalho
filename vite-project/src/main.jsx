import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Importe o BrowserRouter
import AppMan from './components/AppMan.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Envolva o AppMan com BrowserRouter */}
      <AppMan />
    </BrowserRouter>
  </React.StrictMode>
);
