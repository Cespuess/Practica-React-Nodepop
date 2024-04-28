import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdvertDetail } from './serviceDetail';
import AdvertDisplay from '../../components/AdvertDisplay';
import styles from './AdvertDetail.module.scss';
import Button from '../../components/Button';

export default function AdvertDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAdvert() {
      try {
        const advert = await getAdvertDetail(id);
        setAdvert(advert);
      } catch (error) {
        if (error.status === 404) navigate('/404');
        setError(error);
      }
    }

    getAdvert();
  }, [id, navigate]);

  function showError() {
    return <div className={styles.error}>{error.message}</div>;
  }
  function deleteAdvert() {}

  function showAdvert() {
    return (
      <div className={styles.container}>
        <AdvertDisplay {...advert} style="detail" />
        <Button eventFunction={deleteAdvert}>Eliminar Anuncio</Button>
      </div>
    );
  }

  return <div>{error ? showError() : advert && showAdvert()}</div>;
}
