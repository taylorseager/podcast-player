import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function PlaylistCard({ playlistObj }) {
  console.warn(playlistObj);
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playlistObj.image} />
      <Card.Body>
        <Card.Title>{playlistObj.title}</Card.Title>
        <Button variant="primary" className="m-2">VIEW</Button>
        <Button variant="info">EDIT</Button>
        <Button variant="danger" className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

PlaylistCard.propTypes = {
  playlistObj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    ownerID: PropTypes.number,
  }).isRequired,
};

export default PlaylistCard;
