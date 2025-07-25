import { Link } from 'react-router-dom';
import css from './GoBackBtn.module.css';
function GoBackBtn({ locationPath }) {
  return (
    <Link to={locationPath} className={css.goBackBtn}>
      Go Back
    </Link>
  );
}

export default GoBackBtn;
