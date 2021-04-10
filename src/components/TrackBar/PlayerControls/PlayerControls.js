import styled from "styled-components";
import PlayerControlsButtons from "./PlayerControlsButtons";
import TrackProgressBar from "./TrackProgressBar";

const StyledPlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  grid-area: player-controls;
  justify-content: space-evenly;
  align-items: center;
`;

// Spotify context - player, currentDevice,
const PlayerControls = () => {
  return (
    <StyledPlayerControls>
      <PlayerControlsButtons />
      <TrackProgressBar />
    </StyledPlayerControls>
  );
};

export default PlayerControls;
