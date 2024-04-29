import PropTypes from 'prop-types';
import styles from './components-styles/Checkbox.module.scss';

export default function Checkbox({
  id,
  checkName,
  checkValue,
  onChangeFunction,
  children
}) {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={id}
        name={checkName}
        value={checkValue}
        onChange={onChangeFunction}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string,
  checkName: PropTypes.string,
  checkValue: PropTypes.string,
  onChangeFunction: PropTypes.func,
  children: PropTypes.string
};
