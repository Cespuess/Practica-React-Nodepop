import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.module.scss';
import { setAuthorizationHeader } from './api/client.js';
import storage from './utils/storage.js';
import { AuthContextProvider } from './pages/auth/authContext.jsx';

const accessToken = storage.get('auth');
if (accessToken) setAuthorizationHeader(accessToken.accessToken);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider isDefaultLogged={!!accessToken}>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
