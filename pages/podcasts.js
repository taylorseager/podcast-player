import React, { useEffect, useState } from 'react';
import { getAllPodcasts } from '../api/podcastData';
import SearchBar from '../components/SearchBar';
import PodcastCard from '../components/PodcastCard';

export default function ViewPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  const getPodcasts = () => {
    getAllPodcasts().then((data) => {
      setPodcasts(data);
      setFilteredPodcasts(data);
    });
  };

  useEffect(() => {
    getPodcasts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchValue) => {
    const filteredSearch = podcasts.filter((podcast) => (
      podcast.name.toLowerCase().includes(searchValue.toLowerCase())
      || podcast.author.toLowerCase().includes(searchValue.toLowerCase())
      || podcast.description.toLowerCase().includes(searchValue.toLowerCase())
      || podcast.length.toString() === searchValue
    ));
    setFilteredPodcasts(filteredSearch);
  };

  return (
    <>
      <h1>Podcasts</h1>
      <div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="d-flex flex-wrap">
        {filteredPodcasts.map((podcast) => (<PodcastCard podcastObj={podcast} key={podcast.id} onUpdate={getPodcasts} />))}
      </div>
    </>
  );
}
