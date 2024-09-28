import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/AppMan.jsx';  // Verifique se a extensão está correta ou omita a extensão

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
