import { useAuth } from '../../pages/auth/authContext';
import Button from '../Button';
import styles from './layout-styles/Header.module.scss';

export default function Header() {
  const { isLogged, onLogout } = useAuth();

  return (
    <header className={styles.header}>
      <h1>NODEPOP</h1>
      <nav>
        {isLogged ? (
          <>
            <Button>Anuncios</Button>
            <Button>Crear Anuncio</Button>
            <Button eventFunction={onLogout}>Logout</Button>
          </>
        ) : (
          <p>No hay ningún usuario logeado</p>
        )}
      </nav>
    </header>
  );
}
