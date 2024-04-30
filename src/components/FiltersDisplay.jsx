import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import Input from './Input';
import { getTagsList } from '../utils/utils';
import styles from './components-styles/FiltersDisplay.module.scss';
import { useFilters } from '../context/FiltersContext';

export default function FiltersDisplay() {
  const [tagList, setTagList] = useState([]);
  const [error, setError] = useState(false);
  const { filtersValues, setFiltersValues } = useFilters();
  const { filterName, filterTags } = filtersValues;
  console.log(filtersValues);

  useEffect(() => {
    try {
      getTagsList(setTagList, setError);
    } catch {
      setError(error);
    } // eslint-disable-next-line
  }, []);

  function showError() {
    return (
      <div className={styles.error} onClick={() => window.location.reload()}>
        {error.message}
      </div>
    );
  }

  function handleChangeFiltersValues(event) {
    let eventValue;
    if (event.target.name === 'filterTags') {
      eventValue = [...filterTags];
      const { value, checked } = event.target;
      if (checked) eventValue.push(value);
      else {
        const index = eventValue.indexOf(value);
        eventValue.splice(index, 1);
      }
    }
    setFiltersValues((currentFiltersValues) => ({
      ...currentFiltersValues,
      [event.target.name]:
        eventValue !== undefined ? eventValue : event.target.value
    }));
  }

  return (
    <div className={styles.container}>
      <Input
        inputType="text"
        inputName="filterName"
        inputValue={filterName}
        placeholderText="Filtrado por nombre"
        onChangeFunction={handleChangeFiltersValues}
      />
      {error ? (
        showError()
      ) : (
        <fieldset className={styles.filtersFieldset}>
          {tagList.map((tag, index) => (
            <Checkbox
              key={index}
              id={tag}
              checkName="filterTags"
              checkValue={tag}
              onChangeFunction={handleChangeFiltersValues}
            >
              {tag.toUpperCase()}
            </Checkbox>
          ))}
        </fieldset>
      )}
      <select
        className={styles.filtersSelect}
        name="filterSale"
        onChange={handleChangeFiltersValues}
      >
        <option value="all">Venta / Compra</option>
        <option value="true">Venta</option>
        <option value="">Compra</option>
      </select>
    </div>
  );
}
