import { create } from 'apisauce';

const backendApi = create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

backendApi.addRequestTransform(request => {
  var jwtToken = localStorage.getItem('@rettiwt-js/token');
  request.headers['Authorization'] = `Bearer ${jwtToken}`
})

export default backendApi;