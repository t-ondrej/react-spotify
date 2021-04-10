import withAuth from "./components/withAuth";
import SideNav from "./components/SideNav/SideNav";
import Header from "./components/Header/Header";
import "./services/authInterceptor";
import Playlists from "./components/Playlists/Playlists";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaylistDetail from "./components/Playlists/PlaylistDetail/PlaylistDetail";
import styled from "styled-components";
import TrackBar from "./components/TrackBar/TrackBar";
import spotifyLogo from "./assets/spotify-logo.svg";
import SpotifyPlayerProvider from "./components/Spotify/SpotifyPlayerProvider";

const ContentWrapper = styled.div`
  padding: 0 32px;
  width: 100%;
  min-width: 768px;
`;

const Banner = styled.img`
  width: 100%;
  max-width: 131px;
  height: 40px;
  margin: 24px;
`;

function App() {
  return (
    <SpotifyPlayerProvider>
      <Router>
        <SideNav
          mainContent={(scrollingContainerRef) => (
            <>
              <Header scrollingContainerRef={scrollingContainerRef} />
              <ContentWrapper>
                <Switch>
                  <Route path="/playlist/:playlistId">
                    <PlaylistDetail />
                  </Route>
                </Switch>
              </ContentWrapper>
            </>
          )}
          sideContent={
            <>
              <Banner src={spotifyLogo} />
              <Playlists />
            </>
          }
          footer={<TrackBar />}
        ></SideNav>
      </Router>
    </SpotifyPlayerProvider>
  );
}

export default withAuth(App);
