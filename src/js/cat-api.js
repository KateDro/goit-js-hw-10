import axios from 'axios';

const BREEDS_ENDPOINT = '/breeds';
const SEARCH_ENDPOINT = '/images/search';
const API_KEY =
  'live_jSmwZvyDz9JDKcjlTwx6uCRrYiANI1OFd1l0tSFkzISOttha1jCeExaC5cc5pMmD';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return axios.get(`${BREEDS_ENDPOINT}`).then(response => {
    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`${SEARCH_ENDPOINT}?breed_ids=${breedId}`).then(response => {
    if (response.status !== 200) {
      throw new Error(`Помилка: ${response.status}`);
    }
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
