import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../pages/auth/authContext';
import { logout } from '../../pages/auth/service';
import Button from '../Button';
import styles from './layout-styles/Header.module.scss';
import FiltersDisplay from '../FiltersDisplay';
import { createPortal } from 'react-dom';
import ConfirmAction from '../ConfirmAction';
import { useState } from 'react';

export default function Header() {
  const { isLogged, onLogout } = useAuth();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    onLogout();
    logout();
  };

  function handleShowConfirm() {
    setShowConfirm(true);
  }

  async function handleYesAnswer() {
    handleLogout();
    setShowConfirm(false);
  }

  function handleNoAnswer() {
    setShowConfirm(false);
  }

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
            <Button eventFunction={handleShowConfirm}>Logout</Button>
          </>
        ) : (
          <p>No hay ningún usuario logeado</p>
        )}
      </nav>
      {showConfirm &&
        createPortal(
          <ConfirmAction
            text="Seguro que quieres cerra sesión?"
            yesAnswerAction={handleYesAnswer}
            noAnswerAction={handleNoAnswer}
          />,
          document.body
        )}
    </header>
  );
}
