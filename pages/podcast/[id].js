import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import AddToPlaylistForm from '../../components/forms/AddToPlaylistForm';
import { getAllPlaylists } from '../../api/playlistData';
import { useAuth } from '../../utils/context/authContext';

export default function AddToPlaylist() {
  const [addToPlaylist, setAddToPlaylist] = useState({});
  // const router = useRouter();
  // const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getAllPlaylists(user.ownerID).then(setAddToPlaylist);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Add to Your Playlist!</h1>
      <AddToPlaylistForm playlistObj={addToPlaylist} />
    </>
  );
}
