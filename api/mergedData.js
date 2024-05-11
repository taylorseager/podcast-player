import { getSinglePlaylist } from './playlistData';
import { getSinglePodcast, getAllPodcastsForSinglePlaylist } from './podcastData';
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const viewPlaylistDetails = (playlistId) => new Promise((resolve, reject) => {
  getSinglePlaylist(playlistId)
    .then((playlistObj) => {
      getAllPodcastsForSinglePlaylist(playlistObj.id)
        .then((podcastObject) => {
          resolve({ podcastObject, ...playlistObj });
        });
    }).catch((error) => reject(error));
  // Promise.all([getSinglePlaylist(playlistId), getAllPodcastsForSinglePlaylist(playlistId)])
  //   .then(([playlistObj, playlistPodcastArray]) => {
  //     resolve({ ...playlistObj, playlist: playlistPodcastArray });
  //   }).catch((error) => reject(error));
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

const deletePodcastfromPlaylist = (playlistId, podcastId) => new Promise((resolve, reject) => {
  console.warn(playlistId, podcastId);
  fetch(`${endpoint}/api/DeletePodcastFromPlaylist/${playlistId}/${podcastId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'applicaton/json',
    },
  })
    .then((response) => response.text())
    .then((data) => resolve(data))
    .catch(reject);
});

const checkPlaylistPodcastRelationship = (playlistId, podcastIdString) => {
  const podcastId = parseInt(podcastIdString);
  console.warn(playlistId, podcastId);
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/getAllPlaylistpodcastRelationships/`)
      .then((response) => response.json())
      .then((relationships) => {
        console.warn(relationships);
        // Check if any relationship matches both playlistId and podcastId
        const exists = relationships.some((relationship) => {
          return relationship.playlistId === playlistId && relationship.podcastId === podcastId;
        });
        resolve(exists);
      })
      .catch(reject);
  });
};


export {
  viewPlaylistDetails,
  viewPodcastDetails,
  createPlaylistPodcastRelationship,
  deletePodcastfromPlaylist,
  checkPlaylistPodcastRelationship,
};
