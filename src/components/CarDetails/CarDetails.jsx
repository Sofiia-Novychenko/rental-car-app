import CarImage from '../CarImage/CarImage';
import CarTextDetails from '../CarTextDetails/CarTextDetails';
import RentForm from '../RentForm/RentForm';
import css from './CarDetails.module.css';

function CarDetails({ car }) {
  return (
    <div className={css.wrapper}>
      <div className={css.leftColumn}>
        <CarImage img={car.img} description={car.description} />
        <RentForm />
      </div>
      <CarTextDetails
        img={car.img}
        brand={car.brand}
        description={car.description}
        model={car.model}
        year={car.year}
        type={car.type}
        fuelConsumption={car.fuelConsumption}
        engineSize={car.engineSize}
        accessories={car.accessories}
        functionalities={car.functionalities}
        rentalPrice={car.rentalPrice}
        address={car.address}
        rentalConditions={car.rentalConditions}
        mileage={car.mileage}
      />
    </div>
  );
}

export default CarDetails;
