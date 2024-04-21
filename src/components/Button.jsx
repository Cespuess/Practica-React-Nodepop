import PropTypes from 'prop-types';
import styles from './components-styles/Button.module.scss';

export default function Button({ eventFunction, children }) {
  return (
    <button className={styles.button} onClick={eventFunction}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.array.isRequired,
  eventFunction: PropTypes.func
};
