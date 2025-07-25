import css from './CarTextDetails.module.css';
function CarTextDetails({
  year,
  brand,
  model,
  type,
  img,
  description,
  fuelConsumption,
  engineSize,
  accessories = [],
  functionalities = [],
  rentalPrice,
  address,
  rentalConditions = [],
  mileage,
}) {
  const idSpan = img?.match(/\/(\d+)-ai\.jpg$/)?.[1] || 'N/A';
  const formatedAdress = address
    ?.split(',')
    .map(part => part.trim())
    .slice(-2)
    .join(', ');
  const formattedMileage = `${mileage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`;
  const formatedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  return (
    <div className={css.textInfoWrapper}>
      <h2 className={css.carTitle}>
        {brand} {model}, {year}
        <span className={css.imgId}>Id: {idSpan}</span>
      </h2>

      <div className={css.underTitleInfo}>
        <p className={css.location}>
          <svg width="16" height="16" className={css.locationIcon}>
            <use xlinkHref="/sprite.svg#icon-location"></use>
          </svg>
          {formatedAdress}
        </p>
        <p>Mileage: {formattedMileage}</p>
      </div>
      <p className={css.price}>$ {rentalPrice}</p>
      <p className={css.description}>{description}</p>

      <h3>Rental Conditions: </h3>
      <ul>
        {rentalConditions.map((condition, index) => (
          <li key={index} className={css.item}>
            <svg width="16" height="16" className={css.icon}>
              <use xlinkHref="/sprite.svg#icon-check-circle" />
            </svg>
            <p>{condition}</p>
          </li>
        ))}
      </ul>
      <h3>Car Specifications:</h3>
      <ul>
        <li>
          <svg width="16" height="16" className={css.icon}>
            <use xlinkHref="/sprite.svg#icon-calendar" />
          </svg>
          <p>Year: {year}</p>
        </li>
        <li>
          <svg width="16" height="16" className={css.icon}>
            <use xlinkHref="/sprite.svg#icon-car" />
          </svg>
          <p>Type: {formatedType}</p>
        </li>
        <li>
          <svg width="16" height="16" className={css.icon}>
            <use xlinkHref="/sprite.svg#icon-fuel-pump" />
          </svg>
          <p>Fuel Consumption: {fuelConsumption}</p>
        </li>
        <li>
          <svg width="16" height="16" className={css.icon}>
            <use xlinkHref="/sprite.svg#icon-gear" />
          </svg>
          <p>Engine Size: {engineSize}</p>
        </li>
      </ul>
      <h3>Accessories and functionalities:</h3>
      <ul>
        {[...accessories, ...functionalities].map((option, index) => (
          <li key={index}>
            <svg width="16" height="16" className={css.icon}>
              <use xlinkHref="/sprite.svg#icon-check-circle" />
            </svg>
            <p>{option}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarTextDetails;
