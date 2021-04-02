import styled from "styled-components";
import UserWidget from "../UserWidget/UserWidget";
import NavigationButtons from "./NavigationButtons";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  height: 60px;
  width: 100%;
  background-color: #303030;
  position: sticky;
  top: 0;
  z-index: 999;
  transition: background-color 0.2s;
  min-width: 768px;
`;

const Header = ({ scrollingContainerRef }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (scrollingContainerRef) {
      scrollingContainerRef.current.onscroll = (evt) => setScrollPosition(evt.target.scrollTop)
    }
  }, [scrollingContainerRef]);

  const isMax = scrollPosition > 260;
  return (
    <StyledHeader
      style={{ "background-color": `rgba(30, 30, 30, ${isMax ? 1 : 0})` }}
    >
      <NavigationButtons />
      <UserWidget />
    </StyledHeader>
  );
};

Header.propTypes = {
  scrollPosition: PropTypes.number
};

export default Header;
