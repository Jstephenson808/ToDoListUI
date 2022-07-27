import axios from 'axios';

const RestClient = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL,
});
export default RestClient;
