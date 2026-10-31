import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ItemsProvider } from './context/ItemsContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItemsProvider>
          <App />
        </ItemsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
