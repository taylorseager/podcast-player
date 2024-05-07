import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAllPlaylists } from '../api/playlistData';
import PlaylistCard from '../components/PlaylistCard';

export default function ViewPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();
  const getAllUserPlaylists = () => {
    getAllPlaylists(user.uid).then(setPlaylists);
  };
  // Fixes a bug with rendering the correct Podcast Quantity

  useEffect(() => {
    getAllUserPlaylists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.ownerID} playlistObj={playlist} onUpdate={getAllUserPlaylists} />
      ))}
    </div>
  );
}
