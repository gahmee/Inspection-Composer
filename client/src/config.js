const dev = 'http://localhost:4000/api/inspection/';
const prod = 'https://inspection-composer.onrender.com/';

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod;