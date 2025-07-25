import { useFormik } from 'formik';
import Select, { components } from 'react-select';
import css from './FilterBox.module.css';
import { useSelector } from 'react-redux';
import { selectFilterBrands } from '../../redux/filters/selectors';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const customStyles = {
  control: provided => ({
    ...provided,
    minHeight: '44px',
    height: '44px',
    minWidth: '204px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: 'var(--inputs)',
    boxShadow: 'none',
    outline: 'none',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: 0,
    paddingLeft: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  }),
  singleValue: provided => ({
    ...provided,
    color: 'var(--gray)',
    fontSize: '16px',
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: '100%',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: 0,
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: 'var(--white)',
    borderRadius: '12px',
    boxShadow: '0 4px 36px 0 rgba(0, 0, 0, 0.02)',
    marginTop: '4px',
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--inputs)' : 'transparent',
    borderRadius: '12px',
    color: 'var(--gray)',
    padding: '10px 16px',
    cursor: 'pointer',
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '125%',
    color: 'var(--main)',
  }),
};

const DropdownIndicator = props => {
  const { selectProps } = props;
  const isOpen = selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      <svg width="16" height="16">
        <use xlinkHref={`/sprite.svg#icon-${isOpen ? 'up' : 'down'}`} />
      </svg>
    </components.DropdownIndicator>
  );
};

function FilterBox() {
  const [_, setSearchParams] = useSearchParams();
  const brands = useSelector(selectFilterBrands);
  const brandOptions = brands.map(brand => ({ value: brand, label: brand }));
  const priceOptions = [];
  for (let i = 30; i < 151; i += 10) {
    priceOptions.push({
      value: i,
      label: i,
    });
  }

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
    <div>
      <form onSubmit={formik.handleSubmit} className={css.filterBox}>
        <div>
          <label htmlFor="brand" className={css.label}>
            Car brand@
          </label>
          <Select
            name="brand"
            options={brandOptions}
            placeholder="Choose a brand"
            value={
              brandOptions.find(o => o.value === formik.values.brand) || null
            }
            onChange={option => formik.setFieldValue('brand', option.value)}
            isClearable
            styles={customStyles}
            components={{ DropdownIndicator }}
          />
        </div>

        <div>
          <label htmlFor="rentalPrice" className={css.label}>
            Price/ 1 hour
          </label>
          <Select
            name="rentalPrice"
            options={priceOptions}
            placeholder="Choose a pricee"
            value={
              priceOptions.find(o => o.value === formik.values.rentalPrice) ||
              null
            }
            onChange={option =>
              formik.setFieldValue('rentalPrice', option.value)
            }
            isClearable
            styles={customStyles}
            components={{ DropdownIndicator }}
          />
        </div>

        <fieldset>
          <legend className={css.label}>Сar mileage / km</legend>
          <div className={css.mileageInputs}>
            <input
              type="number"
              name="minMileage"
              value={formik.values.minMileage}
              onChange={formik.handleChange}
              placeholder="From"
              className={clsx(css.input, css.min)}
            />
            <input
              type="number"
              name="maxMileage"
              value={formik.values.maxMileage}
              onChange={formik.handleChange}
              placeholder="To"
              className={clsx(css.input, css.max)}
            />
          </div>
        </fieldset>
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
      </form>
    </div>
  );
}

export default FilterBox;
