import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectFavorites } from '../../redux/favorites/selectors';
import css from './CarCard.module.css';
import {
  addToFavorite,
  removeFromFavorites,
} from '../../redux/favorites/slice';
import toast from 'react-hot-toast';

function CarCard({ car }) {
  const {
    id,
    year,
    brand,
    model,
    type,
    img,
    description,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
  } = car;

  const navigate = useNavigate();
  const carId = String(id);
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites?.includes(carId);
  const dispatch = useDispatch();

  const adressParts = address.split(',').map(part => part.trim());
  const city = adressParts[adressParts.length - 2];
  const country = adressParts[adressParts.length - 1];
  const formatedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  const formattedMileage = `${mileage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`;

  const handleLearnMore = () => {
    navigate(`/catalog/${id}`);
  };

  const handleToggleFavorite = () => {
    try {
      if (!isFavorite) {
        dispatch(addToFavorite(carId));
        toast.success('Added to favorites!');
      } else {
        dispatch(removeFromFavorites(carId));
      }
    } catch (error) {
      console.error('error adding to favorite:', error);
      toast.error('Error adding to favorites!');
    }
  };
  return (
    <div className={css.card}>
      <div className={css.imgThumb}>
        <img src={img} alt={description} className={css.image} />
        <button
          type="button"
          className={`${css.favoriteBtn} ${isFavorite ? css.active : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="16" height="15">
            {isFavorite ? (
              <use xlinkHref="/sprite.svg#icon-full-heart"></use>
            ) : (
              <use xlinkHref="/sprite.svg#icon-empty-heart"></use>
            )}
          </svg>
        </button>
      </div>
      <div className={css.titleRow}>
        <h2 className={css.title}>
          {brand} <span className={css.accent}>{model}</span>, {year}
        </h2>
        <p>$ {rentalPrice}</p>
      </div>
      <div className={css.descrWrapper}>
        <p className={css.descripRow}>
          {[city, country, rentalCompany].map((item, index) => (
            <span key={index} className={css.descriptionItem}>
              {item}
            </span>
          ))}
        </p>
        <p className={css.descripRow}>
          {[formatedType, formattedMileage].map((item, index, arr) => (
            <span
              key={index}
              className={css.descriptionItem}
              data-last={index === arr.length - 1}
            >
              {item}
            </span>
          ))}
        </p>
      </div>
      <button
        className={`blueBtn {css.learnMoreBtn}`}
        onClick={handleLearnMore}
      >
        Learn more
      </button>
    </div>
  );
}

export default CarCard;
