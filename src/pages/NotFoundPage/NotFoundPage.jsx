import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className={css.notFoundWrapper}>
        <h2>Not Found</h2>
        <p>The page you're looking for is not found :/</p>
        <Link to="/" className={`blueBtn ${css.homeLink}`}>
          Go Back to Home
        </Link>
      </div>
    </section>
  );
}
