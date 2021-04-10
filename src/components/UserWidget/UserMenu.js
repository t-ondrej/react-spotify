import styled from "styled-components";
import { clearToken } from "../../services/tokenService";
import PropTypes from "prop-types";

const StyledUserMenu = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: #282828;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 4px 4px 0;
  box-shadow: 0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%);
  width: 100%;
`;

const UserMenuLink = styled.a`
  width: 100%;
  padding: 3px 4px 3px 8px;
  margin-bottom: 4px;
  line-height: 32px;
  font-size: 14px;
  white-space: nowrap;
  background: none;
  border: 0;
  border-radius: 2px;
  user-select: none;
  cursor: default;
  color: hsla(0, 0%, 100%, 0.7);
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    color: #fff;
    background-color: hsla(0, 0%, 100%, 0.1);
    text-decoration: none;
  }
`;

const UserMenu = ({ opened }) => {
  const items = [
    {
      title: "Log out",
      onClick: () => {
        clearToken();
        window.location.assign("https://spotify.com/logout");
      },
    },
  ];

  return (
    <>
      {opened ? (
        <StyledUserMenu>
          {items.map((item) => (
            <li key={item.title} onClick={() => item.onClick()}>
              <UserMenuLink>{item.title}</UserMenuLink>
            </li>
          ))}
        </StyledUserMenu>
      ) : null}
    </>
  );
};

UserMenu.propTypes = {
  opened: PropTypes.bool,
};

export default UserMenu;
