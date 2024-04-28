import { useEffect, useState } from 'react';
import { getAdverts } from './serviceAdverts';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import AdvertDisplay from '../../components/AdvertDisplay';
import styles from './AdvertsPage.module.scss';

export default function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAdverts() {
      try {
        const adverts = await getAdverts();
        setAdverts(adverts);
      } catch (error) {
        setError(error);
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
          <AdvertDisplay {...advert} style="list" />
        </Link>
      </div>
    ));
  }

  function showError() {
    return <div className={styles.error}>{error.message}</div>;
  }

  return (
    <div className={styles.advertsList}>
      {error
        ? showError()
        : adverts.length === 0
        ? emptyAdverts()
        : fullAdverts(adverts)}
    </div>
  );
}
