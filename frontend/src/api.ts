import axios from 'axios';
import { BaseUrl } from './Constants';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: `${BaseUrl}`, // Replace with your API base URL
  withCredentials: true, // This ensures cookies are sent with each request
});

export default axiosInstance;
