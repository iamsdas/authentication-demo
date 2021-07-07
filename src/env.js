const PRODUCTION = '';
const DEV = 'http://localhost:5000';
export const url = process.env.NODE_ENV === 'development' ? DEV : PRODUCTION;
