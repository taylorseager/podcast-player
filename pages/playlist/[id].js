import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPlaylistDetails } from '../../api/mergedData';
import PodcastCard from '../../components/PodcastCard';

export default function ViewPlaylists() {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    viewPlaylistDetails(id).then(setPlaylistDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <p>
        {playlistDetails.podcastObject?.podcasts.map((podcast) => (
          <PodcastCard podcastObj={podcast} key={podcast.id} />
        ))}
      </p>
      <div className="text-whie ms-5 details">
        <h5>
          {playlistDetails.title || ''}
          <p>Podcast Quantity: {playlistDetails.podcastQuantity || ''}</p>
          <p>Playlist Image:</p>
          <img src={playlistDetails.image} alt="img" style={{ width: '100px' }} />

        </h5>
      </div>
    </div>
  );
}
