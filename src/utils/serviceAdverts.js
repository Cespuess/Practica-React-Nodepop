import { client } from '../api/client';

export async function getAdverts() {
  const adverts = await client.get('/api/v1/adverts');
  return adverts;
}

export async function getAdvertDetail(id) {
  const advert = await client.get(`/api/v1/adverts/${id}`);
  return advert;
}

export async function deleteAdvertApi(id) {
  await client.delete(`/api/v1/adverts/${id}`);
}

export async function getTags() {
  const tags = await client.get('/api/v1/adverts/tags');
  return tags;
}

export async function createAdverts(advert) {
  const response = await client.post('/api/v1/adverts', advert);
  return response;
}
