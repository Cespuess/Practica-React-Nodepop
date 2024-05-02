import styles from './components-styles/ErrorsDisplay.module.scss';
import PropTypes from 'prop-types';

export default function ErrorsDisplay({ errorMessage, onClickFunction }) {
  return (
    <div className={styles.error} onClick={onClickFunction}>
      {errorMessage}
    </div>
  );
}

ErrorsDisplay.propTypes = {
  errorMessage: PropTypes.string,
  onClickFunction: PropTypes.func
};
