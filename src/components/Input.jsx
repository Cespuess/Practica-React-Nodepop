import PropTypes from 'prop-types';
import styles from './components-styles/Input.module.scss';

export default function Input({
  inputType,
  inputName,
  inputValue,
  placeholderText,
  onChangeFunction
}) {
  return (
    <input
      className={styles.input}
      type={inputType}
      name={inputName}
      value={inputValue}
      placeholder={placeholderText}
      onChange={onChangeFunction}
    ></input>
  );
}

Input.propTypes = {
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputValue: PropTypes.string,
  placeholderText: PropTypes.string,
  onChangeFunction: PropTypes.func
};
