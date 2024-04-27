// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getAllPlaylists } from '../../api/playlistData';

// export default function AddToPlaylistForm({ playlistObj }) {
//   const [formInput, setFormInput] = useState(initialState);
//   const [playlists, setPlaylists] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getAllPlaylists(user.ownerID);
//   });
//   return (
//     <>
//       <Form>
//         <Form.Group className="mb-3" controlId="playlistCheckbox">
//           <Form.Check type="checkbox" label="Check me out" />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </>
//   );
// }
