import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PodcastForm from '../../../components/forms/PodcastForm';
import { getSinglePodcast } from '../../../api/podcastData';

export default function EditPodcastForm() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePodcast(id).then(setEditItem);
  }, [id]);

  return (
    <PodcastForm podcastObj={editItem} />
  );
}
