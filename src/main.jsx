import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.module.scss';
import { setAuthorizationHeader } from './api/client.js';
import { storageLocal, storageSession } from './utils/storage.js';
import { AuthContextProvider } from './pages/auth/authContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { FiltersContextProvider } from './context/FiltersContext.jsx';

const accessToken = storageLocal.get('auth');
if (accessToken) {
  storageSession.set('auth', accessToken.accessToken);
  setAuthorizationHeader(accessToken.accessToken);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider isDefaultLogged={!!accessToken}>
        <FiltersContextProvider>
          <App />
        </FiltersContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
