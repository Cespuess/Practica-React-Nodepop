import { getTags } from './serviceAdverts';

export async function getTagsList(setTagList, setError) {
  try {
    const tagListAPI = await getTags();
    setTagList(tagListAPI);
  } catch (error) {
    setError(error);
  }
}
