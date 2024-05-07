import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { createPlaylist, updatePlaylist, getSinglePlaylistByTitle } from '../../api/playlistData';
import { getUserIDByUID } from '../../api/userData';
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
    if (playlistObj.id) {
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
    if (playlistObj.id) {
      updatePlaylist(formInput).then(() => router.push('/podcasts'));
    } else {
      // Fetch the user's ID based on their firebaseKey (uid) before creating the playlist
      getUserIDByUID(user.uid).then((userData) => {
        if (!userData || userData.length === 0) {
          alert('No user found with the given UID');
          return;
        }

        const ownerID = userData[0].id;
        const payload = { ...formInput, ownerID };
        console.warn('Contents of payload: ', payload);

        // Check that a playlist with the proposed Playlist Name doesn't already exist in the user's database, preventing duplicates.
        getSinglePlaylistByTitle(payload.title).then((playlistData) => {
          if (playlistData) {
            alert('You already have a playlist with that name. Please create a unique name for this playlist.');
            return;
          }

          createPlaylist(payload).then(({ name }) => {
            const patchPayload = { id: name };
            updatePlaylist(patchPayload).then(() => {
              router.push('/podcasts');
            });
          }).catch((error) => {
            console.error('Failed to create playlist:', error);
          });
        }).catch((error) => {
          console.error('Failed to check existing playlist:', error);
        });
      }).catch((error) => {
        console.error('Failed to get user ID:', error);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{playlistObj?.id ? 'Update' : 'Create'} Playlist</h2>

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
      <Button type="submit">{playlistObj?.id ? 'Update' : 'Create'} Playlist</Button>
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
