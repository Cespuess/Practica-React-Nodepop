import { useEffect, useState } from 'react';
import { getAdverts } from './serviceAdverts';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import AdvertDisplay from '../../components/AdvertDisplay';
import styles from './AdvertsPage.module.scss';

export default function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    async function fetchAdverts() {
      try {
        const adverts = await getAdverts();
        setAdverts(adverts);
      } catch (error) {
        alert(error);
      }
    }
    fetchAdverts();
  }, []);

  function emptyAdverts() {
    return (
      <Link to="/adverts/new">
        <Button>¡Sé el primero en crear un anuncio!</Button>
      </Link>
    );
  }

  function fullAdverts(adverts) {
    return adverts.map(({ id, ...advert }) => (
      <div key={id}>
        <Link to={`/adverts/${id}`}>
          <AdvertDisplay {...advert} />
        </Link>
      </div>
    ));
  }

  return (
    <div className={styles.advertsList}>
      {adverts.length === 0 ? emptyAdverts() : fullAdverts(adverts)}
    </div>
  );
}
