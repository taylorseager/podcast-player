// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAllPlaylists } from '../../api/playlistData';

export default function AddToPlaylistForm() {
  // const [formInput, setFormInput] = useState(initialState);
  const [playlists, setPlaylists] = useState([]);
  // const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllPlaylists(user.ownerID).then(setPlaylists);

    // FINISH IF STATEMENT TO PREPOPULATE PLAYLISTS THAT PODCAST IS ALREADY ON
    // if (playlistObj.id) {
    //   setFormInput(playlistObj);
    // }
  }, [user]);
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="playlistCheckbox">
          {
            playlists.map((playlist) => (
              <Form.Check
                type="checkbox"
                id="id"
                name="id"
                label={playlist.title}
                key={playlist.id}
              />
            ))
          }
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
