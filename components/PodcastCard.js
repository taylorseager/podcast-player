import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deletePodcastfromPlaylist, viewPlaylistDetails } from '../api/mergedData';
import { decrementPodcastQuantity } from '../api/playlistData';
import { updatePodcast } from '../api/podcastData';

export default function PodcastCard({ podcastObj, onUpdate }) {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const toggleFavorite = () => {
    if (podcastObj.favorite) {
      updatePodcast({ ...podcastObj, favorite: false }).then(() => onUpdate());
      console.warn(podcastObj);
    } else {
      updatePodcast({ ...podcastObj, favorite: true }).then(() => onUpdate());
    }
  };

  useEffect(() => {
    viewPlaylistDetails(id).then(setPlaylistDetails);
  }, [id]);

  const removeThisPodcast = () => {
    if (window.confirm(`Remove ${podcastObj.name}?`)) {
      decrementPodcastQuantity(playlistDetails.id);
      deletePodcastfromPlaylist(playlistDetails.id, podcastObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="podcastCard" style={{ width: '18rem' }}>
      <Card.Title>{podcastObj.name}<Button variant="light" className="toggleButton m-2" onClick={toggleFavorite}>{podcastObj.favorite ? '❤️' : '🤍'}</Button></Card.Title>
      <Card.Img className="imageFormat" variant="top" src={podcastObj.image} />
      <Card.Body>
        <Card.Text>
          Author(s): {podcastObj.author}
        </Card.Text>
        <Card.Text>
          About: {podcastObj.description}
        </Card.Text>
        <Card.Text>
          Length: {podcastObj.length} Minutes
        </Card.Text>
        <Link passHref href={`/podcast/${podcastObj.id}`}>
          <Button variant="primary">Add to Playlist</Button>
        </Link>
        {playlistDetails.title
          ? (
            <Button variant="danger" onClick={removeThisPodcast} className="m-2">Remove</Button>
          ) : ''}
      </Card.Body>
    </Card>
  );
}

PodcastCard.propTypes = {
  podcastObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    length: PropTypes.number,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
