import { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import UserMenu from "./UserMenu";
import useOutsideClickListener from "../../hooks/useOutsideClickListener";
import { ReactComponent as ArrowUpIcon } from "../../assets/arrow-up.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/arrow-down.svg";

const OpenedUserWidgetCss = css`
  cursor: pointer;
  background-color: #282828;
`;

const StyledUserWidget = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 23px;
  padding: 2px;
  height: 28px;
  position: relative;

  ${({ opened }) => opened && OpenedUserWidgetCss}

  &:hover {
    ${OpenedUserWidgetCss}
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
  color: #fff;
  font-size: 14px;
  line-height: 28px;
`;

const UserWidget = () => {
  const [user, setUser] = useState(null);
  const [opened, setOpened] = useState(false);
  const { ref } = useOutsideClickListener(() => setOpened(false));

  useEffect(() => {
    axios.get("/me").then((user) => setUser(user));
  }, []);

  const ArrowIcon = opened ? ArrowUpIcon : ArrowDownIcon;

  return (
    <StyledUserWidget
      ref={ref}
      opened={opened}
      onClick={() => setOpened(!opened)}
    >
      <UserAvatar src={user?.images[0].url} />
      <UserName>{user?.display_name}</UserName>
      <ArrowIcon style={{ margin: "0 6px" }} />
      <UserMenu opened={opened}></UserMenu>
    </StyledUserWidget>
  );
};

export default UserWidget;
