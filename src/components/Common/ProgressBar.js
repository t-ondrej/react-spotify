import styled from "styled-components";
import PropTypes from "prop-types";

const progressBarHeight = 4;

const ProgressBarSlider = styled.button`
  display: none;
  position: absolute;
  right: -6px;
  top: -4px;
  background-color: #fff;
  border: 0;
  border-radius: 50%;
  width: 12px;
  height: 12px;
`;

const ProgressValue = styled.div`
  height: ${progressBarHeight}px;
  position: relative;
  background-color: var(--gray);
  border-radius: ${progressBarHeight / 2}px;
  max-width: 100%;
`;

const StyledProgressBar = styled.div`
  height: ${progressBarHeight}px;
  width: 100px;
  background-color: #535353;
  border-radius: ${progressBarHeight / 2}px;

  &:hover ${ProgressValue} {
    background-color: var(--light-green);

    ${ProgressBarSlider} {
      display: block;
    }
  }
`;

const ProgressBar = ({ progress, className, onSetProgress }) => {
  const onClick = (evt) => {
    const start = evt.target.offsetLeft;
    const end = evt.clientX;

    const target =
      evt.target.id === "progress-bar" ? evt.target : evt.target.parentElement;
    const total = target.offsetWidth;
    const progressToSet = (end - start) / total;
    onSetProgress(progressToSet);
  };

  return (
    <StyledProgressBar
      id="progress-bar"
      onClick={onClick}
      className={className}
    >
      <ProgressValue style={{ width: `${progress * 100}%` }}>
        <ProgressBarSlider></ProgressBarSlider>
      </ProgressValue>
    </StyledProgressBar>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number,
  className: PropTypes.string,
  onSetProgress: PropTypes.func
};

export default ProgressBar;
