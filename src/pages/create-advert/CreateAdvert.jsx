import { useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './CreateAdvert.module.css';
import { getTags } from '../../utils/serviceAdverts';
import Checkbox from '../../components/Checkbox';

export default function CreateAdvert() {
  const [formValues, setFormValues] = useState({
    name: '',
    sale: null,
    tags: [],
    price: null,
    photo: null
  });
  const [error, setError] = useState(false);
  const [tagList, setTagList] = useState([]);

  const { name, sale, tags, price, photo } = formValues;

  useEffect(() => {
    async function getTagsList() {
      try {
        const tagListAPI = await getTags();
        setTagList(tagListAPI);
      } catch (error) {
        setError(error);
      }
    }

    getTagsList();
  }, []);

  function showError() {
    return (
      <div className={styles.error} onClick={() => setError(false)}>
        {error.message}
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Nuevo Anuncio</h2>
        <form className={styles.formNewAd} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="name">Nombre del producto:</label>
            <Input inputType="text" inputName="name" inputValue="value" />
          </div>
          <div className={styles.formField}>
            <label htmlFor="sale">Vendes o compras:</label>
            <select name="sale" id="sale" required>
              <option value="true">vendes</option>
              <option value="false">compras</option>
            </select>
          </div>
          <fieldset className={styles.formField}>
            <legend>Tags:</legend>
            {tagList.map((tag, index) => (
              <Checkbox key={index} id={tag} checkName={'tags'}>
                {tag.toUpperCase()}
              </Checkbox>
            ))}
          </fieldset>
          <div className={styles.formField}>
            <label htmlFor="price">Precio:</label>
            <Input inputType="number" inputName="price" numberStep="0.01" />
          </div>
          <Button buttonType="submit">Crear Anuncio</Button>
        </form>
        {error && showError()}
      </div>
    </>
  );
}
