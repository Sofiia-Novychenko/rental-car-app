import React from 'react';
import CarCard from '../CarCard/CarCard';
import { useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selectors';
import css from './CarList.module.css';

function CarList() {
  const cars = useSelector(selectCars);
  return (
    <>
      <ul className={css.list}>
        {cars.map(car => (
          <li className={css.item} key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CarList;
