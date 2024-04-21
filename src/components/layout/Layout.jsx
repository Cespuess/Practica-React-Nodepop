import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';
import styles from './layout-styles/Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = { children: PropTypes.element };
