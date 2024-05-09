import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewPlaylistDetails } from '../../api/mergedData';
import PodcastCard from '../../components/PodcastCard';

export default function ViewPlaylists() {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const viewAllPlaylistDetails = () => {
    viewPlaylistDetails(id).then(setPlaylistDetails);
  };

  useEffect(() => {
    viewAllPlaylistDetails();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-whie ms-5 details">
        <h2>{playlistDetails.title || ''} {playlistDetails.favorite ? ' 🥰' : ''}</h2>
        <h4>Podcast Quantity: {playlistDetails.podcastQuantity || ''}</h4>
        <img src={playlistDetails.image} alt="img" style={{ width: '100px' }} />
      </div>
      <div className="podcastCardViewDetails">
        {playlistDetails.podcastObject?.podcasts?.map((podcast) => (
          <PodcastCard podcastObj={podcast} onUpdate={viewAllPlaylistDetails} key={podcast.id} />
        ))}
      </div>
    </div>
  );
}
