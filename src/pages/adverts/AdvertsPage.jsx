import { useEffect, useState } from 'react';
import { getAdverts } from './serviceAdverts';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

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

  function fullAdverts() {}

  return <div>{adverts.length === 0 ? emptyAdverts() : fullAdverts()}</div>;
}
