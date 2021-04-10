import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls/PlayerControls";
import useSpotifyPlayer from "./../../hooks/useSpotifyPlayer";
import { useEffect, useState } from "react";
import ExtraControls from "./ExtraControls";

const StyledTrackBar = styled.div`
  display: grid;
  grid-template-areas: "current-track player-controls extra-controls";
  grid-template-columns: 1fr 2fr 1fr;
  min-width: 620px;
  background-color: #181818;
  border-top: 1px solid #282828;
  grid-area: track-bar;
  height: 90px;
  padding: 0 16px;
  align-items: center;
`;

const TrackBar = () => {
  const [track, setTrack] = useState(null);
  const { player } = useSpotifyPlayer();

  useEffect(() => {
    const playerStateChangedCallback = (state) => {
      setTrack(state.track_window.current_track);
    };

    player?.addListener("player_state_changed", playerStateChangedCallback);

    return () =>
      player?.removeListener(
        "player_state_changed",
        playerStateChangedCallback
      );
  }, [player]);

  return (
    <StyledTrackBar>
      {track && <CurrentTrack track={track} />}
      <PlayerControls />
      <ExtraControls />
    </StyledTrackBar>
  );
};

export default TrackBar;
