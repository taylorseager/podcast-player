import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPodcast, updatePodcast } from '../../api/podcastData';

const initialState = {
  title: '',
  image: '',
  author: '',
  description: '',
  favorite: false,
  length: '',
  ownerID: '',
};

function PodcastForm({ podcastObj }) {
  const [formInput, setFormInput] = useState(initialState);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (podcastObj.id) {
      setFormInput(podcastObj); // Populate form if podcastObj is provided and has an id
    }
  }, [podcastObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (podcastObj.id) {
      updatePodcast(formInput).then(() => router.push('/podcasts'));
    } else {
      const payload = { ...formInput, ownerID: user.uid };
      createPodcast(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updatePodcast(patchPayload).then(() => {
          router.push('/podcasts');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{podcastObj?.id ? 'Update' : 'Create'} Podcast</h2>

      {/* Podcast NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Podcast Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Podcast Title"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Podcast author INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Podcast Author(s)" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Podcast Author(s)"
          name="author"
          value={formInput.author}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PLAYLIST DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Podcast Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a short description of the podcast"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PLAYLIST IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Podcast Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PLAYLIST LENGTH INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Podcast Length" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Length of podcast (in mins)"
          name="length"
          value={formInput.length}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{podcastObj?.id ? 'Update' : 'Create'} Podcast</Button>
    </Form>
  );
}

PodcastForm.propTypes = {
  podcastObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

PodcastForm.defaultProps = {
  podcastObj: initialState,
};

export default PodcastForm;
