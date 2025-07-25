import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import Select from 'react-select';
import css from './FilterBox.module.css';
// import { useSelector } from 'react-redux';
// import { selectFilterBrands } from '../../redux/filters/selectors';
import { useSearchParams } from 'react-router-dom';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
// const customStyles = {
//   control: provided => ({
//     ...provided,
//     minHeight: '33px',
//     height: '33px',
//     minWidth: '179px',
//     border: '1px solid #d9d9d9',
//     borderRadius: '4px',
//     backgroundColor: 'inherit',
//   }),
//   valueContainer: provided => ({
//     ...provided,
//     padding: '0 8px',
//   }),
//   input: provided => ({
//     ...provided,
//     margin: 0,
//     padding: 0,
//   }),
//   indicatorsContainer: provided => ({
//     ...provided,
//     height: '33px',
//   }),
//   singleValue: provided => ({
//     ...provided,
//     color: '#595d62',
//   }),
//   indicatorSeparator: () => ({
//     display: 'none',
//   }),
// };

const brandOptions = [
  { value: 'Toyota', label: 'Toyota' },
  { value: 'BMW', label: 'BMW' },
  { value: 'Honda', label: 'Honda' },
];

const priceOptions = [
  { value: '10', label: '$10/hour' },
  { value: '20', label: '$20/hour' },
  { value: '30', label: '$30/hour' },
];

function FilterBox() {
  const [_, setSearchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      brand: '',
      rentalPrice: '',
      minMileage: '',
      maxMileage: '',
    },
    onSubmit: values => {
      const params = new URLSearchParams();

      if (values.brand) params.set('brand', values.brand);
      if (values.rentalPrice) params.set('rentalPrice', values.rentalPrice);
      if (values.minMileage) params.set('minMileage', values.minMileage);
      if (values.maxMileage) params.set('maxMileage', values.maxMileage);

      // Скидаємо сторінку на першу при новому фільтрі
      params.set('page', '1');

      setSearchParams(params);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.filterBox}>
      <div>
        <label htmlFor="brand" className={css.label}>
          Brand
        </label>
        <Select
          name="brand"
          options={brandOptions}
          placeholder="Select brand"
          value={
            brandOptions.find(o => o.value === formik.values.brand) || null
          }
          onChange={option => formik.setFieldValue('brand', option.value)}
          isClearable
        />
      </div>

      <div>
        <label htmlFor="rentalPrice" className={css.label}>
          Rental Price
        </label>
        <Select
          name="rentalPrice"
          options={priceOptions}
          placeholder="Select price"
          value={
            priceOptions.find(o => o.value === formik.values.rentalPrice) ||
            null
          }
          onChange={option => formik.setFieldValue('rentalPrice', option.value)}
          isClearable
        />
      </div>

      <div>
        <label htmlFor="minMileage" className={css.label}>
          Mileage From
        </label>
        <input
          type="number"
          name="minMileage"
          value={formik.values.minMileage}
          onChange={formik.handleChange}
          placeholder="From"
        />
      </div>

      <div>
        <label htmlFor="maxMileage" className={css.label}>
          Mileage To
        </label>
        <input
          type="number"
          name="maxMileage"
          value={formik.values.maxMileage}
          onChange={formik.handleChange}
          placeholder="To"
        />
      </div>

      <button type="submit">Search</button>
    </form>
  );
}

export default FilterBox;
