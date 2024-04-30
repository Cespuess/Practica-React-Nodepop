import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import Input from './Input';
import { getTagsList } from '../utils/utils';
import styles from './components-styles/FiltersDisplay.module.scss';

export default function FiltersDisplay() {
  const [tagList, setTagList] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTagsList(setTagList, setError);
  }, []);

  return (
    <div className={styles.container}>
      <Input
        inputType="text"
        inputName="filterName"
        inputValue=""
        placeholderText="Filtrado por nombre"
      />
      <fieldset className={styles.filtersFieldset}>
        {tagList.map((tag, index) => (
          <Checkbox
            key={index}
            id={tag}
            checkName="tags"
            checkValue={tag}
            onChangeFunction="d"
          >
            {tag.toUpperCase()}
          </Checkbox>
        ))}
      </fieldset>
      <select className={styles.filtersSelect} name="sale">
        <option value="all">Venta / Compra</option>
        <option value="true">Venta</option>
        <option value="false">Compra</option>
      </select>
    </div>
  );
}
