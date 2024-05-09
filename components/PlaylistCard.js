import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { deletePlaylist, updatePlaylist } from '../api/playlistData';

function PlaylistCard({ playlistObj, onUpdate }) {
  const toggleFavorite = () => {
    if (playlistObj.favorite) {
      updatePlaylist({ ...playlistObj, favorite: false }).then(() => onUpdate());
    } else {
      updatePlaylist({ ...playlistObj, favorite: true }).then(() => onUpdate());
    }
  };

  const deleteThisPlaylist = () => {
    if (window.confirm(`Are you 1000% positive you want to delete ${playlistObj.title}? This action cannot be undone.`)) {
      deletePlaylist(playlistObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="playlistCard" style={{ width: '18rem' }}>
      <Card.Img className="imageFormat" variant="top" src={playlistObj.image} />
      <Card.Body>
        <Card.Title>{playlistObj.title}</Card.Title>
        <p>Playlist Quantity: {playlistObj.podcastQuantity}</p>
        <Button variant="light" onClick={toggleFavorite}>{playlistObj.favorite ? '💛' : '🖤'}</Button>
        <Link href={`/playlist/${playlistObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/playlist/edit/${playlistObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
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
    podcastQuantity: PropTypes.number,
    ownerID: PropTypes.number,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistCard;
