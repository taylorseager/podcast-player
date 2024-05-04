import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAllPlaylists, getSinglePlaylistByTitle } from '../../api/playlistData';
import { createPlaylistPodcastRelationship } from '../../api/mergedData';

export default function AddToPlaylistForm() {
  // const [formInput, setFormInput] = useState(initialState);
  const [playlists, setPlaylists] = useState([]);
  // Initialize state to hold the selected checkboxes
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    getAllPlaylists(user.ownerID).then(setPlaylists);

    // FINISH IF STATEMENT TO PREPOPULATE PLAYLISTS THAT PODCAST IS ALREADY ON
    // if (playlistObj.id) {
    //   setFormInput(playlistObj);
    // }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detailPromises = selectedPlaylists.map((title) => getSinglePlaylistByTitle(title).catch((error) => {
      console.error(`Failed to fetch details for playlist '${title}':`, error);
      return null; // Return null for failed fetches
    }));

    Promise.all(detailPromises)
      .then((details) => {
      // Filter out nulls and extract IDs
        const playlistIds = details.filter((detail) => detail && detail.id).map((detail) => detail.id);

        // Create relationships for each playlistId
        const relationshipPromises = playlistIds.map((playlistId) => createPlaylistPodcastRelationship(playlistId, id)
          .catch((error) => {
            console.error(`Failed to create relationship for playlist ${playlistId}:`, error);
            return null;
          }));

        return Promise.all(relationshipPromises);
      })
      .catch((error) => {
        console.error('Error processing details or relationships:', error);
      });

    router.push('/podcasts');
  };

  // Creates and dynamically updates an array of the currently checked boxes on the form.
  const handleCheckboxChange = (playlistName) => {
    setSelectedPlaylists((currentSelected) => {
      if (currentSelected.includes(playlistName)) {
        // If the name is already selected, remove it from the array
        return currentSelected.filter((name) => name !== playlistName);
      }
      // Otherwise, add the name to the array
      return [...currentSelected, playlistName];
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="playlistCheckbox">
        {playlists.map((playlist) => (
          <Form.Check
            type="checkbox"
            id={playlist.id} // Ensure this uses `playlist.id` instead of "id"
            name={playlist.id.toString()} // Change if needed to handle identification
            label={playlist.title}
            key={playlist.id}
            checked={selectedPlaylists.includes(playlist.title)} // Check if the title is in the selected array
            onChange={() => handleCheckboxChange(playlist.title)} // Pass the title to the handler
          />
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
