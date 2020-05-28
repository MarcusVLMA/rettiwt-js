import { create } from 'apisauce';

var jwtToken = localStorage.getItem('@rettiwt-js/token');

const backendApi = create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`
  },
});

export default backendApi;