import { clientCredentials } from '../utils/client';

// URL TO DATABASE FOR PROMISES/API CALLS
const endpoint = clientCredentials.databaseURL;

// PROMISE TO GET ALL PODCASTS
const getAllPodcasts = () => new Promise((resolve, reject) => {
  console.warn(endpoint);
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
  fetch(`${endpoint}/api/getSinglePodcast/${id}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// PROMISE TO GET ALL PODCASTS FOR A SINGLE PLAYLIST
const getAllPodcastsForSinglePlaylist = (playlistId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getAllPodcastsForSinglePlaylist/${playlistId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATES new podcast
const createPodcast = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/createPodcast`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// updates podcast based on specific id
const updatePodcast = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/updatePodcast/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllPodcasts,
  getSinglePodcast,
  getAllPodcastsForSinglePlaylist,
  createPodcast,
  updatePodcast,
};
