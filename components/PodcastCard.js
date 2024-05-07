import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deletePodcastfromPlaylist, viewPlaylistDetails } from '../api/mergedData';
import { decrementPodcastQuantity } from '../api/playlistData';

export default function PodcastCard({ podcastObj, onUpdate }) {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

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
      <Card.Title>{podcastObj.name}</Card.Title>
      <Card.Img variant="top" src={podcastObj.image} />
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
