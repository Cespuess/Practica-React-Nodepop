import Button from '../Button';
import styles from './layout-styles/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>NODEPOP</h1>
      <nav>
        <Button>Anuncios</Button>
        <Button>Crear Anuncio</Button>
      </nav>
    </header>
  );
}
