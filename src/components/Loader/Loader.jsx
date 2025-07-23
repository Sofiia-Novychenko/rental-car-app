import React from 'react';
import { PuffLoader } from 'react-spinners';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loaderContainer}>
      <PuffLoader />
    </div>
  );
}

export default Loader;
