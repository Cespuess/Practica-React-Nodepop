import { client } from '../../api/client';

export async function getAdverts() {
  try {
    const adverts = await client.get('/api/v1/adverts');
    console.log(adverts);
    return adverts;
  } catch (error) {
    alert(error);
  }
}
