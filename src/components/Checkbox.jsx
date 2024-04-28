import PropTypes from 'prop-types';
import styles from './components-styles/Checkbox.module.scss';

export default function Checkbox({ id, checkName, checkValue, children }) {
  return (
    <div className={styles.checkboxContainer}>
      <label htmlFor={id}>{children}</label>
      <input type="checkbox" id={id} name={checkName} value={checkValue} />
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checkName: PropTypes.string,
  checkValue: PropTypes.string,
  children: PropTypes.string
};
