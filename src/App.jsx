import Layout from './components/layout/Layout';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
              <Outlet />
            </RequireAuth>
          }
        >
          <Route index element={<AdvertsPage />} />
          <Route path="/adverts/:id" element={<AdvertDetail />} />
          <Route path="/adverts/new" element={<CreateAdvert />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Layout>
  );
}

export default App;
