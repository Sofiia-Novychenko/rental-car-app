import React, { useEffect } from 'react';
import FilterBox from '../../components/FilterBox/FilterBox';
import CarList from '../../components/CarList/CarList';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';
// import { selectPage } from '../../redux/cars/selectors';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  // const page = useSelector(selectPage);

  const brandParam = searchParams.get('brand') || '';
  const rentalPriceParam = searchParams.get('rentalPrice') || '';
  const minMileageParam = searchParams.get('minMileage') || '';
  const maxMileageParam = searchParams.get('maxMileage') || '';

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
      console.error('Error in CatalogPage is:', error.message);
    }
  }, [
    brandParam,
    dispatch,
    maxMileageParam,
    minMileageParam,
    rentalPriceParam,
  ]);
  return (
    <div className="container">
      <FilterBox />
      <CarList />
      <LoadMoreBtn />
    </div>
  );
}

export default CatalogPage;
