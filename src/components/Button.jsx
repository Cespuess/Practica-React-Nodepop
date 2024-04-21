import PropTypes from 'prop-types';
import styles from './components-styles/Button.module.scss';

export default function Button({ buttonType, eventFunction, children }) {
  return (
    <button type={buttonType} className={styles.button} onClick={eventFunction}>
      {children}
    </button>
  );
}

Button.propTypes = {
  buttonType: PropTypes.string,
  children: PropTypes.string.isRequired,
  eventFunction: PropTypes.func
};
