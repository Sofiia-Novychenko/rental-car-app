import css from './UpBtn.module.css';
function UpBtn({ onClick }) {
  return (
    <button type="button" className={css.upBtn} onClick={onClick}>
      <svg width="50" height="40">
        <use xlinkHref="/sprite.svg#icon-up"></use>
      </svg>
    </button>
  );
}

export default UpBtn;
