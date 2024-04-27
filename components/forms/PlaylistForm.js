import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { createPlaylist, updatePlaylist } from '../../api/playlistData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  image: '',
  podcastQuantity: 0,
  ownerID: '',
};

function PlaylistForm({ playlistObj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (playlistObj && playlistObj.id) {
      setFormInput(playlistObj); // Populate form if playlistObj is provided and has an id
    }
  }, [playlistObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playlistObj && playlistObj.id) {
      updatePlaylist(formInput).then(() => router.push('/podcasts'));
    } else {
      const payload = { ...formInput, ownerID: -1 };
      console.warn('The contents of the payload are:', payload);
      createPlaylist(payload).then(() => router.push('/podcasts'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{playlistObj && playlistObj.id ? 'Update' : 'Create'} Playlist</h2>

      {/* PLAYLIST NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Playlist Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Playlist Name"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PLAYLIST IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Playlist Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{playlistObj && playlistObj.id ? 'Update' : 'Create'} Playlist</Button>
    </Form>
  );
}

PlaylistForm.propTypes = {
  playlistObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
  }),
};

PlaylistForm.defaultProps = {
  playlistObj: initialState,
};

export default PlaylistForm;
