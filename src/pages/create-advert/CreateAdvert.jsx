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

  const { name, sale, tags, price, photo } = formValues;
  console.log(tags);
  console.log(formValues);

  useEffect(() => {
    async function getTagsList() {
      try {
        const tagList = await getTags();
        setFormValues((currentFormValues) => ({
          ...currentFormValues,
          tags: tagList
        }));
      } catch (error) {
        // if (error.status === 404) navigate('/404');
        // setError(error);
      }
    }

    getTagsList();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Nuevo Anuncio</h2>
      <form className={styles.formNewAd}>
        <div className={styles.formField}>
          <label htmlFor="name">Nombre del producto:</label>
          <Input inputType="text" inputName="name" />
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
          {tags.map((tag, index) => (
            <Checkbox key={index} id={tag} checkName={'tags'} checkValue={tag}>
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
    </div>
  );
}
