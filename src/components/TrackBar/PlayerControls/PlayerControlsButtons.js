import styled from "styled-components";
import { ReactComponent as ShuffleIcon } from "../../../assets/enable-shuffle.svg";
import { ReactComponent as PreviousIcon } from "../../../assets/previous.svg";
import { ReactComponent as NextIcon } from "../../../assets/next.svg";
import { ReactComponent as PlayIcon } from "../../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/pause.svg";
import { ReactComponent as RepeatIcon } from "../../../assets/repeat.svg";
import useSpotifyPlayer from "../../../hooks/useSpotifyPlayer";
import { useState, useEffect } from "react";
import axios from "axios";

const StyledPlayerControlsButtons = styled.div`
  display: flex;
  width: 224px;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PlayerControl = styled.button`
  background-color: unset;
  outline: unset;
  border: unset;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayControl = styled(PlayerControl)`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  background-color: #fff;
`;

const PlayerControlsButtons = () => {
  const [paused, setPaused] = useState(true);
  const { player } = useSpotifyPlayer();

  useEffect(() => {
    const playerStateChangedCallback = (state) => {
      setPaused(state.paused);
    };

    player?.addListener("player_state_changed", playerStateChangedCallback);

    return () =>
      player?.removeListener(
        "player_state_changed",
        playerStateChangedCallback
      );
  }, [player]);

  const onPlay = () => {
    player.togglePlay();
  };

  const onPrevious = () => {
    axios.post("/me/player/previous");
  };


  const onNext = () => {
    axios.post("/me/player/next");
  };

  return (
    <StyledPlayerControlsButtons>
      <PlayerControl>
        <ShuffleIcon />
      </PlayerControl>
      <PlayerControl>
        <PreviousIcon onClick={onPrevious}/>
      </PlayerControl>
      <PlayControl onClick={onPlay}>
        {paused ? <PlayIcon /> : <PauseIcon />}
      </PlayControl>
      <PlayerControl>
        <NextIcon onClick={onNext}/>
      </PlayerControl>
      <PlayerControl>
        <RepeatIcon />
      </PlayerControl>
    </StyledPlayerControlsButtons>
  );
};

export default PlayerControlsButtons;
