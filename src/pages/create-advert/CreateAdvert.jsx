import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './CreateAdvert.module.css';

export default function CreateAdvert() {
  const [formValues, setFormValues] = useState({
    name: '',
    sale: null,
    tags: [],
    price: null,
    photo: null
  });

  const { name, sale, tags, price, photo } = formValues;

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
          <div className={styles.formFieldTags}>
            <input
              type="checkbox"
              id="lifestyle"
              name="tags"
              value="lifestyle"
            />
            <label htmlFor="lifestyle">Lifestyle</label>
          </div>
          <div className={styles.formFieldTags}>
            <input type="checkbox" id="mobile" name="tags" value="mobile" />
            <label htmlFor="mobile">Mobile</label>
          </div>
          <div className={styles.formFieldTags}>
            <input type="checkbox" id="motor" name="tags" value="motor" />
            <label htmlFor="motor">Motor</label>
          </div>
          <div className={styles.formFieldTags}>
            <input type="checkbox" id="work" name="tags" value="work" />
            <label htmlFor="work">Work</label>
          </div>
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
