import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAllPlaylists, getSinglePlaylistByTitle } from '../../api/playlistData';
import { createPlaylistPodcastRelationship, checkPlaylistPodcastRelationship } from '../../api/mergedData';

export default function AddToPlaylistForm() {
  // const [formInput, setFormInput] = useState(initialState);
  const [playlists, setPlaylists] = useState([]);
  // Initialize state to hold the selected checkboxes
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id: podcastId } = router.query;


  useEffect(() => {
    getAllPlaylists(user.ownerID)
      .then((playlistData) => {
        // Fetch all playlists and then filter out playlists where the podcast already exists
        Promise.all(playlistData.map((playlistObject) => checkPlaylistPodcastRelationship(playlistObject.id, podcastId)))

          .then((results) => {
            // Filter out playlists where the podcast already exists
            console.warn(results);
            const filteredPlaylists = playlistData.filter((podcastId, index) => !results[index]);
            setPlaylists(filteredPlaylists);
          })
          .catch((error) => {
            console.error('Error checking playlist-podcast relationships:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching playlists:', error);
      });
  }, [user]);
  
  // useEffect(() => {
  //   getAllPlaylists(user.ownerID).then(setPlaylists);
  //   getAllPlaylists(user.ownerID).then((playlistData) => { 
  //     console.warn(playlistData);
  //     playlistData.map((id) => checkPlaylistPodcastRelationship(id).catch((error) =>
  //    });
  //   console.warn(id);
  //   checkPlaylistPodcastRelationship()
  // }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch details for each playlist based on the selected titles.
    const detailPromises = selectedPlaylists.map((title) => getSinglePlaylistByTitle(title).catch((error) => {
      console.error(`Failed to fetch details for playlist '${title}':`, error);
      return null; // Return null for failed fetches
    }));
    Promise.all(detailPromises)
      .then((details) => {
        // Filter out nulls and extract IDs
        const playlistIds = details.filter((detail) => detail && detail.id).map((detail) => detail.id);
        // Create relationships and then increment the podcast quantity for each playlistId
        const relationshipPromises = playlistIds.map((playlistId) => createPlaylistPodcastRelationship(playlistId, podcastId)
          .then(() => incrementPodcastQuantity(playlistId)) // Increment quantity after a successful relationship creation
          .catch((error) => {
            console.error(`Failed to create relationship or increment for playlist ${playlistId}:`, error);
            return null;
          }));
        return Promise.all(relationshipPromises);
      })
      .then(() => {
        router.push('/playlists');
      })
      .catch((error) => {
        console.error('Error processing details or relationships:', error);
      });
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
