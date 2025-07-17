require('@testing-library/jest-dom');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();
global.fetch = fetchMock;
