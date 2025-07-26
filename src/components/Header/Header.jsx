import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

function Header() {
  return (
    <header className={css.header}>
      <nav className={css.headerNav}>
        <a href="/" className={css.logo} aria-label="Site logo">
          <svg width="102" height="16">
            <use xlinkHref="/sprite.svg#icon-RentalCar"></use>
          </svg>
        </a>
        <ul className={css.navList}>
          <li className={css.item}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
          </li>
          <li className={css.item}>
            <NavLink to="/catalog" className={buildLinkClass}>
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
