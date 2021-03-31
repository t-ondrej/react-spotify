import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import UserMenu from "./UserMenu";
import useOutsideClickListener from "../../hooks/useOutsideClickListener";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";

const StyledUserWidget = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 23px;
  padding: 2px;
  height: 28px;
  position: relative;

  // TODO remove the duplicity with hover selector
  ${({ opened }) =>
    opened
      ? `
    cursor: pointer;
    background-color: #282828;`
      : ""}

  &:hover {
    cursor: pointer;
    background-color: #282828;
  }
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-right: 8px;
  float: left;
`;

const UserName = styled.span`
  color: white;
  font-size: 14px;
  line-height: 28px;
`;

const Arrow = styled.img`
  margin: 0 6px;
`;

const UserWidget = () => {
  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const { ref } = useOutsideClickListener(() => setOpened(false));

  useEffect(() => {
    axios.get("/me").then(user => setUser(user));
  }, []);

  return (
    <StyledUserWidget
      ref={ref}
      opened={opened}
      onClick={() => setOpened(!opened)}
    >
      <UserAvatar src={user?.images[0].url} />
      <UserName>{user?.display_name}</UserName>
      <Arrow src={`${opened ? arrowUp : arrowDown}`} />
      <UserMenu opened={opened}></UserMenu>
    </StyledUserWidget>
  );
};

export default UserWidget;
