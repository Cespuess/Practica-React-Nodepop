import { createContext, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const FiltersContext = createContext();

export function FiltersContextProvider({ children }) {
  const [filtersValues, setFiltersValues] = useState({
    filterName: '',
    filterTags: [],
    filterSale: 'all'
  });

  const contextValue = { filtersValues, setFiltersValues };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  return useContext(FiltersContext);
}

FiltersContextProvider.propTypes = {
  children: PropTypes.node
};
