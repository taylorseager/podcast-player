import React, { useEffect, useState } from 'react';
import { getAllPodcasts } from '../api/podcastData';
import PodcastCard from '../components/PodcastCard';

export default function ViewPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const getPodcasts = () => {
    getAllPodcasts().then(setPodcasts);
  };

  useEffect(() => {
    getPodcasts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Podcasts</h1>
      <div className="d-flex flex-wrap">
        {podcasts.map((podcast) => (<PodcastCard podcastObj={podcast} key={podcast.id} />))}
      </div>
    </>
  );
}
