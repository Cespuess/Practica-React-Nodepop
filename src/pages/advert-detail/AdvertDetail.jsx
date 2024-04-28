import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAdvertApi, getAdvertDetail } from '../../utils/serviceAdverts';
import AdvertDisplay from '../../components/AdvertDisplay';
import styles from './AdvertDetail.module.scss';
import Button from '../../components/Button';
import { createPortal } from 'react-dom';
import ConfirmAction from '../../components/ConfirmAction';

export default function AdvertDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [advert, setAdvert] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

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

  function handleShowConfirm() {
    setShowConfirm(true);
  }

  async function handleYesAnswer() {
    await deleteAdvert();
    setShowConfirm(false);
  }

  function handleNoAnswer() {
    setShowConfirm(false);
  }

  async function deleteAdvert() {
    try {
      await deleteAdvertApi(id);
      navigate('/');
    } catch (error) {
      setError(error);
      setTimeout(() => navigate('/'), 3000);
    }
  }

  function showAdvert() {
    return (
      <div className={styles.container}>
        <AdvertDisplay {...advert} style="detail" />
        <Button eventFunction={handleShowConfirm}>Eliminar Anuncio</Button>
      </div>
    );
  }

  return (
    <>
      <div>{error ? showError() : advert && showAdvert()}</div>;
      {showConfirm &&
        createPortal(
          <ConfirmAction
            text="Seguro que quieres borrar el anuncio?"
            yesAnswerAction={handleYesAnswer}
            noAnswerAction={handleNoAnswer}
          />,
          document.body
        )}
    </>
  );
}
