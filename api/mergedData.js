import { getSinglePlaylist } from './playlistData';
import { getSinglePodcast } from './podcastData';

const viewPlaylistDetails = (playlistId) => new Promise((resolve, reject) => {
  getSinglePlaylist(playlistId)
    .then((playlistObject) => {
      getSinglePodcast(playlistObject.podcastId)
        .then((podcastObject) => {
          resolve({ podcastObject, ...playlistObject });
        });
    }).catch((error) => reject(error));
});

const viewPodcastDetails = (podcastId) => new Promise((resolve, reject) => {
  getSinglePodcast(podcastId).then((podcastObject) => {
    getSinglePodcast(podcastObject.podcastId)
      .then((playlistObject) => {
        resolve({ ...playlistObject, podcastObject });
      });
  }).catch((error) => reject(error));
});

export default {
  viewPlaylistDetails,
  viewPodcastDetails,
};
