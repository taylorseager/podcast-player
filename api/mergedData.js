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

export default viewPlaylistDetails;
