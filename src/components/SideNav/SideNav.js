import styled from "styled-components";
import { useRef } from "react";

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

const SideNav = ({ sideContent, mainContent, footer }) => {
  const ref = useRef();

  return (
    <StyledSideNav>
      <SideContent>{sideContent}</SideContent>

      <MainContent ref={ref}>
        <FadingBackground />
        {mainContent(ref)}
      </MainContent>

      {footer}
    </StyledSideNav>
  );
};

export default SideNav;
