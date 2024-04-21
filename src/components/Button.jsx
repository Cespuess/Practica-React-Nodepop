import PropTypes from 'prop-types';
import styles from './components-styles/Button.module.scss';

export default function Button({
  buttonType,
  eventFunction,
  children,
  disabledButton = false
}) {
  return (
    <button
      type={buttonType}
      className={`${styles.button} ${disabledButton ? styles.disabled : ''}`}
      onClick={eventFunction}
      disabled={disabledButton}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  buttonType: PropTypes.string,
  children: PropTypes.string.isRequired,
  eventFunction: PropTypes.func,
  disabledButton: PropTypes.bool
};
