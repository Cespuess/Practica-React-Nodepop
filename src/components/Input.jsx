import PropTypes from 'prop-types';
import styles from './components-styles/Input.module.scss';

export default function Input({
  inputType,
  inputId,
  inputName,
  inputValue,
  numberStep,
  inputRef,
  placeholderText,
  onChangeFunction
}) {
  return (
    <input
      className={styles.input}
      type={inputType}
      id={inputId}
      name={inputName}
      value={inputValue}
      step={numberStep}
      ref={inputRef}
      placeholder={placeholderText}
      onChange={onChangeFunction}
    ></input>
  );
}

Input.propTypes = {
  inputType: PropTypes.string,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  numberStep: PropTypes.string,
  inputRef: PropTypes.object,
  placeholderText: PropTypes.string,
  onChangeFunction: PropTypes.func
};
