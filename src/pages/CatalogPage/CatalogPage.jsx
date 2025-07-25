import React, { useEffect } from 'react';
import FilterBox from '../../components/FilterBox/FilterBox';
import CarList from '../../components/CarList/CarList';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';
// import { selectPage } from '../../redux/cars/selectors';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { fetchBrands } from '../../redux/filters/operations';
import { selectIsLoadingCars } from '../../redux/cars/selectors';
import Loader from '../../components/Loader/Loader';

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  // const page = useSelector(selectPage);
  const loading = useSelector(selectIsLoadingCars);

  const brandParam = searchParams.get('brand') || '';
  const rentalPriceParam = searchParams.get('rentalPrice') || '';
  const minMileageParam = searchParams.get('minMileage') || '';
  const maxMileageParam = searchParams.get('maxMileage') || '';

  useEffect(() => {
    try {
      dispatch(fetchBrands()).unwrap();
    } catch (error) {
      console.error('Error fetching cars in CatalogPage is:', error.message);
    }
  }, [dispatch]);
  useEffect(() => {
    try {
      dispatch(
        fetchCars({
          brand: brandParam,
          rentalPrice: rentalPriceParam,
          minMileage: minMileageParam,
          maxMileage: maxMileageParam,
        })
      ).unwrap();
    } catch (error) {
      console.error('Error fetchning cars in CatalogPage is:', error.message);
    }
  }, [
    brandParam,
    dispatch,
    maxMileageParam,
    minMileageParam,
    rentalPriceParam,
  ]);
  return (
    <section className="section">
      <div className="container">
        <FilterBox />
        {loading && <Loader />}
        {!loading && <CarList />}
        <LoadMoreBtn />
      </div>
    </section>
  );
}

export default CatalogPage;
