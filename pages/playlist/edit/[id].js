import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PlaylistForm from '../../../components/forms/PlaylistForm';
import { getSinglePlaylist } from '../../../api/playlistData';

export default function EditPlaylistForm() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePlaylist(id).then(setEditItem);
  }, [id]);

  return (
    <PlaylistForm playlistObj={editItem} />
  );
}
