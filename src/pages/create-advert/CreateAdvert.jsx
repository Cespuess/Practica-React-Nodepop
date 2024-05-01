import { useEffect, useRef, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import styles from './CreateAdvert.module.scss';
import { createAdverts } from '../../utils/serviceAdverts';
import Checkbox from '../../components/Checkbox';
import { useNavigate } from 'react-router-dom';
import { getTagsList } from '../../utils/utils';

export default function CreateAdvert() {
  const [formValues, setFormValues] = useState({
    name: '',
    sale: true,
    tags: [],
    price: ''
  });
  const inputFileRef = useRef();
  const [error, setError] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const { name, tags, price } = formValues;
  const disButton = !name || !tags.length || !price || isFetching;

  useEffect(() => {
    getTagsList(setTagList, setError);
  }, []);

  useEffect(() => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tags: selectedCheckbox
    }));
  }, [selectedCheckbox]);

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

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = { ...formValues };
    if (inputFileRef.current.files.length === 1) {
      formData.photo = inputFileRef.current.files[0];
    }

    try {
      setIsFetching(true);
      const createdAd = await createAdverts(formData);
      navigate(`/adverts/${createdAd.id}`);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Nuevo Anuncio</h2>
        <form className={styles.formNewAd} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="name" className={styles.labelForm}>
              Nombre del producto:
            </label>
            <Input
              inputType="text"
              inputId="name"
              inputName="name"
              inputValue={name}
              onChangeFunction={handleChangeFormValues}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="sale" className={styles.labelForm}>
              Vendes o compras:
            </label>
            <select name="sale" id="sale" onChange={handleChangeFormValues}>
              <option value="true">vendes</option>
              <option value="">compras</option>
            </select>
          </div>
          <fieldset
            className={`${styles.formField} ${styles.createAdFieldset}`}
          >
            <legend className={styles.createAdLegend}>Tags:</legend>
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
            <label htmlFor="price" className={styles.labelForm}>
              Precio:
            </label>
            <Input
              inputType="number"
              inputId="price"
              inputName="price"
              numberStep="0.01"
              inputValue={price}
              onChangeFunction={handleChangeFormValues}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="file" className={styles.labelForm}>
              Foto:
            </label>
            <Input inputType="file" inputId="file" inputRef={inputFileRef} />
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
