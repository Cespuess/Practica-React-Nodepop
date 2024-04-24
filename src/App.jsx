import './App.module.scss';
import Layout from './components/layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdvertsPage from './pages/adverts/AdvertsPage';
import AdvertDetail from './pages/advert-detail/AdvertDetail';
import CreateAdvert from './pages/create-advert/CreateAdvert';
import NotFound from './pages/notFound/NotFound';
import RequireAuth from './pages/auth/components/RequireAuth';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <AdvertsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <RequireAuth>
              <AdvertDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth>
              <CreateAdvert />
            </RequireAuth>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Layout>
  );
}

export default App;
