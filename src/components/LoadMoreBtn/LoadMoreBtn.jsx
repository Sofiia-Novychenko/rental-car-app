import css from './LoadMoreBtn.module.css';
function LoadMoreBtn({ onClick, disabled }) {
  return (
    <button
      type="button"
      className={css.loadMoreBtn}
      onClick={onClick}
      disabled={disabled}
    >
      Load more
    </button>
  );
}

export default LoadMoreBtn;
