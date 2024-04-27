import { clientCredentials } from '../utils/client';

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// PROMISE TO GET ALL PODCASTS
const getAllPodcasts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getAllPodcasts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// PROMISE TO GET SINGLE PODCAST
const getSinglePodcast = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getSinglePodcast/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getAllPodcasts, getSinglePodcast };
