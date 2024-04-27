import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deletePlaylist } from '../api/playlistData';

function PlaylistCard({ playlistObj, onUpdate }) {
  const deleteThisPlaylist = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${playlistObj.title}? This action cannot be undone.`)) {
      deletePlaylist(playlistObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={playlistObj.image} />
      <Card.Body>
        <Card.Title>{playlistObj.title}</Card.Title>
        <p>Playlist Quantity: {playlistObj.podcastQuantity}</p>
        <Button variant="primary" className="m-2">VIEW</Button>
        <Button variant="info">EDIT</Button>
        <Button variant="danger" onClick={deleteThisPlaylist} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

PlaylistCard.propTypes = {
  playlistObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    podcastQuantity: PropTypes.string,
    ownerID: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistCard;
