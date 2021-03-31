import withAuth from "./components/withAuth";
import SideNav from "./components/SideNav/SideNav";
import Header from "./components/Header/Header";
import "./services/authInterceptor";
import Playlists from "./components/Playlists/Playlists";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaylistDetail from "./components/Playlists/PlaylistDetail/PlaylistDetail";
import styled from "styled-components";

const ContentWrapper = styled.div`
  padding: 0 32px;
  width: 100%;
  min-width: 768px;
`;

function App() {
  return (
    <Router>
      <SideNav
        mainContent={scrollPosition => (
          <>
            <Header scrollPosition={scrollPosition} />
            <ContentWrapper>
              <Switch>
                <Route path="/playlist/:playlistId">
                  <PlaylistDetail />
                </Route>
              </Switch>
            </ContentWrapper>
          </>
        )}
        sideContent={<Playlists />}
      ></SideNav>
    </Router>
  );
}

export default withAuth(App);
