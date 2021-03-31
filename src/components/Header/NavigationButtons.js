import leftArrow from "../../assets/arrow-left.svg";
import rightArrow from "../../assets/arrow-right.svg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const NavigationButton = styled.button`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-right: 16px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: unset;
  background-color: rgba(0, 0, 0, 0.7);

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;

    img {
      cursor: not-allowed;
    }
  }
`;

const NavigationButtonIcon = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

const NavigationButtons = () => {
  const [forwardStack, setForwardStack] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const unregisterCallback = history.listen((_, action) => {
      if (action === "PUSH") {
        setForwardStack(0);
      }
    });

    return () => unregisterCallback();
  }, [history]);

  const onBack = () => {
    history.goBack();
    setForwardStack(state => ++state);
  };

  const onForward = () => {
    history.goForward();
    setForwardStack(state => --state);
  };

  return (
    <div>
      <NavigationButton style={{ float: "left" }} onClick={onBack}>
        <NavigationButtonIcon src={leftArrow} />
      </NavigationButton>
      <NavigationButton disabled={forwardStack < 1} onClick={onForward}>
        <NavigationButtonIcon src={rightArrow} />
      </NavigationButton>
    </div>
  );
};

export default NavigationButtons;
