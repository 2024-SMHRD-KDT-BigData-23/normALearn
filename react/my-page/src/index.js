import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에서 createRoot 사용
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './fonts.css'; // Import the new CSS file with the font-face rule
import Loginpage from './Loginpage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
     <Loginpage/>
    </BrowserRouter>
  </React.StrictMode>
);
