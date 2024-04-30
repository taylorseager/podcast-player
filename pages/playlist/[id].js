import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewPlaylistDetails from '../../api/mergedData';
import PlaylistForm from '../../components/forms/PlaylistForm';

export default function ViewPlaylists() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    viewPlaylistDetails(id).then(setEditItem);
  }, [id]);

  return (
    <PlaylistForm playlistObj={editItem} />
  );
}
