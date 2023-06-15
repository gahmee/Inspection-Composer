const dev = 'http://localhost:4000/api/inspection/';
const prod = 'WEBSITE_URL_HERE';

export const API_URL = process.env.NODE_ENV === 'development' ? dev : prod;