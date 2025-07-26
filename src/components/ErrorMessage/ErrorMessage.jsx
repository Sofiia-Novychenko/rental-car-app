import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorMessage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);
  return <p>Whoops, something went wrong! Redirecting to Catalog page...</p>;
}

export default ErrorMessage;
