import { useEffect, useState } from 'react';
import { getAdverts } from './serviceAdverts';

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
    return <p>No hay anuncios en este momento.</p>;
  }

  function fullAdverts() {}

  return <div>{adverts.length === 0 ? emptyAdverts() : fullAdverts()}</div>;
}
