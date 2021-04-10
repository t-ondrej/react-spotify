import { useEffect, useState, useRef } from "react";
import useSpotifyPlayer from "../../../hooks/useSpotifyPlayer";
import ProgressBar from "../../Common/ProgressBar";
import styled from "styled-components";

const TrackTime = styled.div`
  font-size: 11px;
  font-weight: 400;
`;

const StyledTrackProgressBar = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProgressBar = styled(ProgressBar)`
  width: 80%;
  margin: 0 8px;
`;

const TrackProgressBar = () => {
  const { player } = useSpotifyPlayer();
  const [progress, setProgress] = useState(0);
  const [totalTime, setTotalTime] = useState({ minutes: 0, seconds: 0 });
  const [elapsedTime, setElapsedTime] = useState({ minutes: 0, seconds: 0 });
  const intervalId = useRef(null);

  useEffect(() => {
    // Playback status updates
    player?.addListener("player_state_changed", (state) => {
      const totalTimeMinutes = Math.floor(state.duration / 1000 / 60);
      const totalTimeSeconds = Math.floor(state.duration / 1000) % 60;

      const elapsedTimeMinutes = Math.floor(state.position / 1000 / 60);
      const elapsedTimeSeconds = Math.floor(state.position / 1000) % 60;

      setTotalTime({
        minutes: totalTimeMinutes,
        seconds: totalTimeSeconds,
      });
      setElapsedTime({
        minutes: elapsedTimeMinutes,
        seconds: elapsedTimeSeconds,
      });

      if (state.position === 0) {
        setProgress(0);
      } else {
        setProgress(state.position / state.duration);
      }

      clearInterval(intervalId.current);

      if (state.paused) {
        return;
      }

      const interval = 1000;
      const progressUpdate = interval / state.duration;
      intervalId.current = setInterval(() => {
        setProgress((state) => state + progressUpdate);
        setElapsedTime((state) => {
          const elapsedTime = state.minutes * 60 + state.seconds + 1;
          const newElapsedTimeMinutes = Math.floor(elapsedTime / 60);
          const newElapsedTimeSeconds = elapsedTime % 60;
          return {
            minutes: newElapsedTimeMinutes,
            seconds: newElapsedTimeSeconds,
          };
        });
      }, interval);
    });
    return () => clearInterval(intervalId.current);
  }, [player]);

  const seekTrackTime = (progress) => {
    const totalTimeInMs =
      totalTime.minutes * 60 * 1000 + totalTime.seconds * 1000;
    const targetTime = totalTimeInMs * progress;
    player.seek(targetTime);
  };

  return (
    <StyledTrackProgressBar>
      <TrackTime>{`${elapsedTime.minutes}:${
        elapsedTime.seconds < 10 ? "0" : ""
      }${elapsedTime.seconds}`}</TrackTime>
      <StyledProgressBar
        progress={progress}
        width="80%"
        onSetProgress={seekTrackTime}
      ></StyledProgressBar>
      <TrackTime>{`${totalTime.minutes}:${totalTime.seconds < 10 ? "0" : ""}${
        totalTime.seconds
      }`}</TrackTime>
    </StyledTrackProgressBar>
  );
};

export default TrackProgressBar;
