import styled from "styled-components";
import spotifyLogo from "../../assets/spotify-logo.svg";
import { useState } from "react";

const StyledSideNav = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
  grid-template-rows: 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas: "nav-bar main-view" "track-bar track-bar";
`;

const SideContent = styled.div`
  display: flex;
  height: 100%;
  min-height: 100%;
  width: 240px;
  float: left;
  background-color: black;
  flex-direction: column;
  grid-area: nav-bar;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: overlay;
  position: relative;
  grid-area: main-view;
`;

const Banner = styled.img`
  width: 100%;
  max-width: 131px;
  height: 40px;
  margin: 24px;
`;

const FadingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgb(83, 83, 83);
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), #121212);
  height: 332px;
  z-index: -1;
  transition: background 1s ease;
`;

const SideNav = ({ sideContent, mainContent }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <StyledSideNav>
      <SideContent>
        <Banner src={spotifyLogo} />
        {sideContent}
      </SideContent>

      <MainContent onScroll={evt => setScrollPosition(evt.target.scrollTop)}>
        <FadingBackground />
        {mainContent(scrollPosition)}
      </MainContent>
    </StyledSideNav>
  );
};

export default SideNav;
