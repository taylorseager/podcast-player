import React, { useEffect, useState } from 'react';
import AddToPlaylistForm from '../../components/forms/AddToPlaylistForm';
import { getAllPlaylists } from '../../api/playlistData';
import { useAuth } from '../../utils/context/authContext';

export default function AddToPlaylist() {
  const [addToPlaylist, setAddToPlaylist] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getAllPlaylists(user.ownerID).then(setAddToPlaylist);
  }, [user.ownerID]);

  return (
    <>
      <h1>Add to Your Playlist!</h1>
      <AddToPlaylistForm playlistObj={addToPlaylist} />
    </>
  );
}
