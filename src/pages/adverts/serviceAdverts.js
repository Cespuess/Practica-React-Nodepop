import { client } from '../../api/client';

export async function getAdverts() {
  const adverts = await client.get('/api/v1/adverts');
  return adverts;
}
