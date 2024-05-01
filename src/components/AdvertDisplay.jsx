import PropTypes from 'prop-types';
import defautlImage from '../assets/defaultImage.jpg';
import styles from './components-styles/AdvertDisplay.module.scss';

export default function AdvertDisplay({
  name,
  price,
  sale,
  tags,
  photo,
  style
}) {
  return (
    <div
      className={
        style === 'list' ? styles.advertDisplayList : styles.advertDisplayDetail
      }
    >
      <div className={styles.containerImage}>
        <img src={photo ? photo : defautlImage} alt={name} />
      </div>
      <p>{name}</p>
      <div className={styles.price}>{price} €</div>
      <div className={styles.tags}>{tags.join(' ')}</div>
      <p>{sale ? 'Se Vende' : 'Se compra'}</p>
    </div>
  );
}

AdvertDisplay.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  sale: PropTypes.bool,
  photo: PropTypes.string,
  style: PropTypes.string
};
