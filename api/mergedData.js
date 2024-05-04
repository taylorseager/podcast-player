import { getSinglePlaylist } from './playlistData';
import { getSinglePodcast, getAllPodcastsForSinglePlaylist } from './podcastData';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const viewPlaylistDetails = (playlistId) => new Promise((resolve, reject) => {
  getSinglePlaylist(playlistId)
    .then((playlistObject) => {
      getAllPodcastsForSinglePlaylist(playlistObject.id)
        .then((podcastObject) => {
          resolve({ podcastObject, ...playlistObject });
        });
    }).catch((error) => reject(error));
});

// Adds a podcast to a playlist by creating a new Playlist-Podcast entity on the joined table.
const createPlaylistPodcastRelationship = (playlistID, podcastID) => {
  // Pass in playlistID and podcastID from the function parameters into the payload to create a new Playlist-Podcast Object.
  const payload = {
    playlistId: playlistID,
    podcastId: podcastID,
  };

  // Posts the payload to the Playlist-Podcast Database. Note: The Back-End API call will return a 400 error if this relationship already
  // exists, preventing users from adding a podcast more than once to a playlist.
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/addPodcastToPlaylist/${playlistID}/${podcastID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
};

const viewPodcastDetails = (podcastId) => new Promise((resolve, reject) => {
  getSinglePodcast(podcastId).then((podcastObject) => {
    getSinglePodcast(podcastObject.podcastId)
      .then((playlistObject) => {
        resolve({ ...playlistObject, podcastObject });
      });
  }).catch((error) => reject(error));
});

const deletePodcastfromPlaylist = (podcastId, playlistId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/DeletePodcastFromPlaylist/${playlistId}/${podcastId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'applicaton/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  viewPlaylistDetails,
  viewPodcastDetails,
  createPlaylistPodcastRelationship,
  deletePodcastfromPlaylist,
};
