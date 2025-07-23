import React from 'react';
import css from './Hero.module.css';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css.heroContentContainer}>
          <h1 className={css.mainTitle}>Find your perfect rental car</h1>
          <p className={css.subTitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <button
            className={css.btnBlue}
            type="button"
            onClick={() => {
              navigate('/catalog');
            }}
          >
            View Catalog
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
