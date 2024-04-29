import { useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './CreateAdvert.module.css';
import { getTags } from '../../utils/serviceAdverts';
import Checkbox from '../../components/Checkbox';

export default function CreateAdvert() {
  const [formValues, setFormValues] = useState({
    name: '',
    sale: true,
    tags: [],
    price: '',
    photo: null
  });
  const [error, setError] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);

  const { name, tags, price, photo } = formValues;
  const disButton = !name || !tags.length || !price;

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

  function handleChangeFormValues(event) {
    // definimos eventValue para poder cambiar el tipo al valor de price y sale
    let eventValue;
    if (event.target.name === 'price') eventValue = Number(event.target.value);
    else if (event.target.name === 'sale')
      eventValue = Boolean(event.target.value);

    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]:
        eventValue !== undefined ? eventValue : event.target.value
    }));
  }

  function handleChangeValueCheckbox(event) {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckbox([...selectedCheckbox, value]);
    } else {
      setSelectedCheckbox(selectedCheckbox.filter((tag) => tag !== value));
    }
  }

  useEffect(() => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tags: selectedCheckbox
    }));
  }, [selectedCheckbox]);

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
            <Input
              inputType="text"
              inputName="name"
              inputValue={name}
              onChangeFunction={handleChangeFormValues}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="sale">Vendes o compras:</label>
            <select name="sale" id="sale" onChange={handleChangeFormValues}>
              <option value="true">vendes</option>
              <option value="">compras</option>
            </select>
          </div>
          <fieldset className={styles.formField}>
            <legend>Tags:</legend>
            {tagList.map((tag, index) => (
              <Checkbox
                key={index}
                id={tag}
                checkName="tags"
                checkValue={tag}
                onChangeFunction={handleChangeValueCheckbox}
              >
                {tag.toUpperCase()}
              </Checkbox>
            ))}
          </fieldset>
          <div className={styles.formField}>
            <label htmlFor="price">Precio:</label>
            <Input
              inputType="number"
              inputName="price"
              numberStep="0.01"
              inputValue={price}
              onChangeFunction={handleChangeFormValues}
            />
          </div>
          <Button buttonType="submit" disabledButton={disButton}>
            Crear Anuncio
          </Button>
        </form>
        {error && showError()}
      </div>
    </>
  );
}
