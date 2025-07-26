import { useEffect, useState } from 'react';
import FilterBox from '../../components/FilterBox/FilterBox';
import CarList from '../../components/CarList/CarList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';
import { fetchBrands } from '../../redux/filters/operations';
import {
  selectIsLoadingCars,
  selectTotalCars,
  selectTotalPages,
} from '../../redux/cars/selectors';
import Loader from '../../components/Loader/Loader';
import { resetCars } from '../../redux/cars/slice';
import UpBtn from '../../components/UpBtn/UpBtn';

function CatalogPage() {
  const dispatch = useDispatch();
  const {
    selectedBrand,
    selectedRentalPrice,
    selectedMinMileage,
    selectedMaxMileage,
  } = useSelector(state => state.filters);
  const totalPages = useSelector(selectTotalPages);
  const totalCars = useSelector(selectTotalCars);
  const limitPerPage = 12;
  const loading = useSelector(selectIsLoadingCars);
  const [page, setPage] = useState(1);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      dispatch(fetchBrands()).unwrap();
    } catch (error) {
      console.error('Error fetching brands in CatalogPage:', error.message);
    }
  }, [dispatch]);

  // useEffect: при зміні фільтрів
  useEffect(() => {
    dispatch(resetCars());
    setPage(1);
  }, [
    dispatch,
    selectedBrand,
    selectedRentalPrice,
    selectedMinMileage,
    selectedMaxMileage,
  ]);
  const handleLoadMoreClick = () => {
    setPage(prevValue => prevValue + 1);
  };

  useEffect(() => {
    try {
      dispatch(
        fetchCars({
          brand: selectedBrand,
          rentalPrice: selectedRentalPrice,
          minMileage: selectedMinMileage,
          maxMileage: selectedMaxMileage,
          page,
          limit: 12,
        })
      ).unwrap();
    } catch (error) {
      console.error('Error fetchning cars in CatalogPage is:', error.message);
    }
  }, [
    dispatch,
    page,
    selectedBrand,
    selectedMaxMileage,
    selectedMinMileage,
    selectedRentalPrice,
  ]);

  return (
    <section className="section">
      <div className="container">
        <FilterBox />
        {loading && <Loader />}
        {!loading && (
          <CarList
            onLoadMoreClick={handleLoadMoreClick}
            disabled={page >= totalPages}
            showButton={totalCars >= limitPerPage}
          />
        )}
        <UpBtn onClick={handleScrollToTop} />
      </div>
    </section>
  );
}

export default CatalogPage;
