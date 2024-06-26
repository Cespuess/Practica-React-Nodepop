import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './main.module.scss';
import { setAuthorizationHeader } from './api/client.js';
import { storageLocal, storageSession } from './utils/storage.js';
import { AuthContextProvider } from './pages/auth/authContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { FiltersContextProvider } from './context/FiltersContext.jsx';
import ErrorBoundary from './components/error/ErrorBoundary.jsx';

const accessTokenLocal = storageLocal.get('auth');
const accessTokenSession = storageSession.get('auth');
const accessToken = accessTokenLocal || accessTokenSession;

if (accessToken) {
  const token = accessTokenSession ? accessTokenSession : accessTokenLocal;
  storageSession.set('auth', token);
  setAuthorizationHeader(token);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthContextProvider isDefaultLogged={!!accessToken}>
          <FiltersContextProvider>
            <App />
          </FiltersContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
