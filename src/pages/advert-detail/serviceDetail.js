import { client } from '../../api/client';

export async function getAdvertDetail(id) {
  const advert = await client.get(`/api/v1/adverts/${id}`);
  return advert;
}
