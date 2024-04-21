import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = { children: PropTypes.element };
