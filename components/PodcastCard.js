import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export default function PodcastCard({ podcastObj }) {
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
        <Link passHref href={`podcast/${podcastObj.id}`}>
          <Button variant="primary">Add to Playlist</Button>
        </Link>
        <Link href={`/podcast/${podcastObj?.id}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
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
};
