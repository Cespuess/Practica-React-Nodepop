import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../authContext';
import PropTypes from 'prop-types';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { isLogged } = useAuth();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired
};
