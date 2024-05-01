import styles from './NotFound.module.scss';
import notFoundImage from '../../assets/notFound.jpg';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src={notFoundImage} alt="Not Found" />
    </div>
  );
}
