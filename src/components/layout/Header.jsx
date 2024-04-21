import styles from './layout-styles/Header.module.scss';

export default function Header() {
  return (
    <header>
      <div>
        <h1>NODEPOP</h1>
      </div>
      <nav>
        <a href="https://www.marca.com">
          <button>Anuncios</button>
        </a>
        <a href="https://www.as.com">
          <button>Crear Anuncio</button>
        </a>
      </nav>
    </header>
  );
}
