import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPlaylistDetails } from '../../api/mergedData';
import PlaylistCard from '../../components/PlaylistCard';

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
        {playlistDetails.podcasts?.map((podcast) => (
          <PlaylistCard playlistObj={podcast} key={podcast.id} />
        ))}
      </p>
      <div className="text-whie ms-5 details">
        <h5>
          {playlistDetails.title || ''}
          <p>Podcast Quantity: {playlistDetails.podcastQuantity || ''}</p>
          <p>Podcast Image: {playlistDetails.image || ''}</p>
        </h5>
      </div>
    </div>
  );
}
