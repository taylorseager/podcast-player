import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL PLAYLISTS
const getAllPlaylists = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getAllPlaylists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// gets a single playlist by id
const getSinglePlaylist = (id) => new Promise((resolve, reject) => {
  console.warn(id);
  fetch(`${endpoint}/api/getSinglePlaylist/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// gets a single playlist by title
const getSinglePlaylistByTitle = (title) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getSinglePlaylistByTitle/${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// gets all playlists for a single user based on userId
const getAllUserPlaylists = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/getAllUserPlaylists/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// creates a new playlist
const createPlaylist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/createPlaylist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// updates playlist based on specific id
const updatePlaylist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/updatePlaylist/${payload.id}`, {
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

// deletes a playlist based on id
const deletePlaylist = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/deletePlaylist/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

// Increments Podcast Quantity on a Playlist
const incrementPodcastQuantity = (playlistId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/incrementPodcastQuantity/${playlistId}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      // Process the response if it's OK
      return response.json(); 
    }
    // Throw an error if response not OK
    throw new Error('Failed to increment podcast quantity'); 
  })
  .then(data => resolve(data))
  .catch(reject);
});

// Decrements Podcast Quantity on a Playlist
const decrementPodcastQuantity = (playlistId) => new Promise((resolve, reject) => {
  console.log(`Attempting to decrement podcast quantity for playlist ID: ${playlistId}`);
  fetch(`${endpoint}/api/decrementPodcastQuantity/${playlistId}`, {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      // Process the response if it's OK
      return response.json(); 
    }
    // Throw an error if response not OK
    throw new Error('Failed to decrement podcast quantity'); 
  })
  .then(data => resolve(data))
  .catch(reject);
});

export {
  getAllPlaylists,
  getSinglePlaylist,
  getAllUserPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getSinglePlaylistByTitle,
  incrementPodcastQuantity,
  decrementPodcastQuantity,
};
