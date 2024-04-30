import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../pages/auth/authContext';
import { logout } from '../../pages/auth/service';
import Button from '../Button';
import styles from './layout-styles/Header.module.scss';
import FiltersDisplay from '../FiltersDisplay';

export default function Header() {
  const { isLogged, onLogout } = useAuth();
  const location = useLocation();
  console.log(location);
  const handleLogout = () => {
    onLogout();
    logout();
  };
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>NODEPOP</h1>
      </Link>
      {location.pathname === '/adverts' && <FiltersDisplay />}
      <nav>
        {isLogged ? (
          <>
            <NavLink
              to="/adverts"
              className={({ isActive }) => (isActive ? styles.hidden : '')}
              end
            >
              <Button>Anuncios</Button>
            </NavLink>
            <NavLink
              to="/adverts/new"
              className={({ isActive }) => (isActive ? styles.hidden : '')}
              end
            >
              <Button>Crear Anuncio</Button>
            </NavLink>
            <Button eventFunction={handleLogout}>Logout</Button>
          </>
        ) : (
          <p>No hay ningún usuario logeado</p>
        )}
      </nav>
    </header>
  );
}
