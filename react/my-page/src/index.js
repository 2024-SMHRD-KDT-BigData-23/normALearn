import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서 createRoot 사용
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS
import './fonts.css'; // Import the new CSS file with the font-face rule

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
