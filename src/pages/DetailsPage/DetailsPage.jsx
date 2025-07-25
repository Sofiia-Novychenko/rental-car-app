import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';
import CarDetails from '../../components/CarDetails/CarDetails';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchCarById } from '../../utils/carsApi';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

function DetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/catalog');

  useEffect(() => {
    const getCarDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchCarById(id);
        setCar(data);
      } catch (error) {
        console.error('Error while fetching car details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCarDetails();
  }, [id]);
  return (
    <section className="section">
      <div className="container">
        <GoBackBtn locationPath={backLinkHref.current} />
        {loading && <Loader />}
        {/* {error && <ErrorMessage />} */}
        {car ? <CarDetails car={car} /> : null}
      </div>
    </section>
  );
}

export default DetailsPage;
