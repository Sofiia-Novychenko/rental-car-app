import axios from 'axios';

export const fetchCarById = async id => {
  const resp = await axios.get(`/cars/${id}`);
  return resp.data || [];
};
