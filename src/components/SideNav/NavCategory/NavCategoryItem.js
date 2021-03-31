import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)`
  color: ${({ selected }) => (selected ? "white" : "gray")};
  height: 32px;
  line-height: 32px;
  min-height: 32px;
  position: relative;
  font-size: 14px;
  user-select: none;
  padding-left: 24px;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

const NavCategoryItem = ({ name, path }) => {
  const location = useLocation();
  return (
    <StyledLink to={path} selected={location.pathname === path}>
      {name}
    </StyledLink>
  );
};

NavCategoryItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string
};

export default NavCategoryItem;
