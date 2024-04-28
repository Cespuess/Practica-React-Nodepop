import Button from './Button';
import PropTypes from 'prop-types';
import styles from './components-styles/ConfirmAction.module.scss';

export default function ConfirmAction({
  text,
  yesAnswerAction,
  noAnswerAction
}) {
  return (
    <div className={styles.container}>
      <h3 className={styles.text}>{text}</h3>
      <div className={styles.buttons}>
        <Button eventFunction={yesAnswerAction}>Si</Button>
        <Button eventFunction={noAnswerAction}>No</Button>
      </div>
    </div>
  );
}

ConfirmAction.propTypes = {
  text: PropTypes.string.isRequired,
  yesAnswerAction: PropTypes.func.isRequired,
  noAnswerAction: PropTypes.func.isRequired
};
