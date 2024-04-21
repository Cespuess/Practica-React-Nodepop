import { getAdverts } from './serviceAdverts';

export default async function AdvertsPage() {
  const adverts = await getAdverts();

  function emptyAdverts() {
    return <p>No hay anuncios en este momento.</p>;
  }

  function fullAdverts() {}

  return <div>{adverts.length === 0 ? emptyAdverts() : fullAdverts()}</div>;
}
