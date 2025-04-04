import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api.com/api', // Change to your real API URL
headers: {
    'Content-Type': 'application/json',
},
});

export default api;

