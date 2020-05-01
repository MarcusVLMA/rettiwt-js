import { create } from 'apisauce';

const backendApi = create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default backendApi;