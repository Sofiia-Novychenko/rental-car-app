import css from './CarImage.module.css';

function CarImage({ img, description }) {
  return (
    <div className={css.imgThumd}>
      <img src={img} alt={description} className={css.image} />
    </div>
  );
}

export default CarImage;
