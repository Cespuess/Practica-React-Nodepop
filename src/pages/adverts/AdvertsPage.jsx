import { useEffect, useState } from 'react';
import { getAdverts } from '../../utils/serviceAdverts';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import AdvertDisplay from '../../components/AdvertDisplay';
import styles from './AdvertsPage.module.scss';
import { useFilters } from '../../context/FiltersContext';

export default function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [error, setError] = useState(null);
  const { filtersValues } = useFilters();
  const { filterName, filterSale, filterTags } = filtersValues;

  useEffect(() => {
    async function fetchAdverts() {
      try {
        const adverts = await getAdverts();
        setAdverts(adverts);
      } catch (error) {
        setError(error);
      }
    }
    fetchAdverts();
  }, []);

  function emptyAdverts() {
    return (
      <div className={styles.emptyAdverts}>
        <Link to="/adverts/new">
          <Button>¡Sé el primero en crear un anuncio!</Button>
        </Link>
      </div>
    );
  }

  function fullAdverts(ads) {
    return (
      <div className={styles.advertsList}>
        {ads.map(({ id, ...ad }) => (
          <div key={id} className={styles.advertContainerList}>
            <Link to={`/adverts/${id}`}>
              <AdvertDisplay {...ad} style="list" />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  function filteredAdverts(ads) {
    let advertsToShow = ads;
    if (filterSale !== 'all') {
      advertsToShow = advertsToShow.filter(
        (ad) => ad.sale === Boolean(filterSale)
      );
    }
    if (filterName) {
      advertsToShow = advertsToShow.filter((ad) =>
        ad.name.toUpperCase().includes(filterName.toUpperCase())
      );
    }
    if (filterTags !== 0) {
      advertsToShow = advertsToShow.filter((ad) => {
        return filterTags.every((tag) => ad.tags.includes(tag));
      });
    }

    console.log(filtersValues);

    return advertsToShow.length === 0 ? (
      <h3>No hay anuncios con estos filtros</h3>
    ) : (
      fullAdverts(advertsToShow)
    );
  }

  function showAdverts(ads) {
    if (!filterName && filterSale === 'all' && filterTags.length === 0) {
      return fullAdverts(ads);
    } else {
      return filteredAdverts(ads);
    }
  }

  function showError() {
    return <div className={styles.error}>{error.message}</div>;
  }

  return (
    <>
      {error
        ? showError()
        : adverts.length === 0
        ? emptyAdverts()
        : showAdverts(adverts)}
    </>
  );
}
