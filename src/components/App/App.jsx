import { lazy, Suspense } from 'react';
import './App.css';
import Loader from '../Loader/Loader';
import Layout from '../Layout/Layout.jsx';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() =>
  import('../../pages/CatalogPage/CatalogPage.jsx')
);
const DetailsPage = lazy(() =>
  import('../../pages/DetailsPage/DetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage.jsx')
);
function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
