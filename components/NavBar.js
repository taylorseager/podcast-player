/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import logo from '../public/PodcastPlayerLogo.png';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Image
          src={logo}
          width="50"
          height="50"
          alt="SoundScape"
        />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/podcasts">
              <Nav.Link>Podcasts</Nav.Link>
            </Link>
            <Link passHref href="/playlists">
              <Nav.Link>Playlists</Nav.Link>
            </Link>
            <Link passHref href="/playlist/newPlaylist">
              <Nav.Link>Create Playlist</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
