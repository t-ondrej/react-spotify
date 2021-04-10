import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import useSpotifyPlayer from "../../../../hooks/useSpotifyPlayer";
import { ReactComponent as PlayIcon } from "../../../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../../../assets/pause.svg";
import { useState, useEffect } from "react";
import AnimatedEqualiser from "../../../../assets/animated-equaliser.gif";

const TrackData = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: normal;
  text-transform: none;
  display: flex;
  align-items: center;
  min-width: 0;
`;

const RowIdxWrapper = styled.div`
  display: flex;
  position: relative;

  svg {
    position: absolute;
    transform: translateX(-3px);
  }
`;

const StyledTrackRow = styled.div`
  display: grid;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(
      120px,
      1fr
    );
  grid-gap: 16px;
  height: 56px;
  min-height: 56px;
  padding: 0 16px;
  min-width: 768px;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  &:hover ${RowIdxWrapper}:first-child {
    visibility: hidden !important;
  }

  &:hover svg {
    visibility: visible !important;
  }
`;

const AlbumImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  object-fit: cover;
`;

const getDateToDisplay = (date) => {
  const dateParts = date.toDateString().split(" ");
  return `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
};

const getDurationToDisplay = (durationInMs) => {
  const durationInSec = Math.floor(durationInMs / 1000);
  const minutes = Math.floor(durationInSec / 60);
  const seconds = durationInSec % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const TrackRow = ({ idx, track, contextUri }) => {
  const { player, deviceId } = useSpotifyPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCurrentSong, setIsCurrentSong] = useState(false);

  useEffect(() => {
    const playerStateChangedCallback = (state) => {
      if ([state.track_window.current_track.linked_from?.id, state.track_window.current_track.id].includes(track.track.id)) {
        setIsCurrentSong(true);
        setIsPlaying(!state.paused);
      } else if (isCurrentSong) {
        setIsCurrentSong(false);
        setIsPlaying(false);
      }
    };

    player?.addListener("player_state_changed", playerStateChangedCallback);

    return () =>
      player?.removeListener(
        "player_state_changed",
        playerStateChangedCallback
      );
  });

  const playSong = () => {
    const action = isPlaying ? "pause" : "play";
    axios.put(`me/player/${action}?device_id=${deviceId}`, {
      context_uri: contextUri,
      offset: {
        position: idx
      }
    });
  };

  const IdxWrapperIcon = isPlaying ? PauseIcon : PlayIcon;

  return (
    <StyledTrackRow>
      <RowIdxWrapper>
        {isPlaying ? (
          <img
            style={{ height: "16px", "align-self": "center" }}
            alt="Animated equaliser"
            src={AnimatedEqualiser}
          />
        ) : (
          <TrackData style={isCurrentSong ? { color: "var(--light-green" } : null}>
            {idx + 1}
          </TrackData>
        )}

        <IdxWrapperIcon
          style={{ alignSelf: "center", visibility: "hidden" }}
          fill="white"
          onClick={playSong}
        />
      </RowIdxWrapper>
      <TrackData>
        {track.track.album.images.length > 0 ? (
          <AlbumImage src={track.track.album.images[2].url} />
        ) : null}
        <span
          className="ellipsis-one-line"
          style={isCurrentSong ? { color: "#1db954" } : null}
        >
          {track.track.name}
        </span>
      </TrackData>
      <TrackData>
        <span className="ellipsis-one-line">{track.track.album.name}</span>
      </TrackData>
      <TrackData>{getDateToDisplay(new Date(track.added_at))}</TrackData>
      <TrackData>{getDurationToDisplay(track.track.duration_ms)}</TrackData>
    </StyledTrackRow>
  );
};

TrackRow.propTypes = {
  idx: PropTypes.number,
  track: PropTypes.shape({
    added_at: PropTypes.string,
    track: PropTypes.shape({
      album: PropTypes.shape({
        name: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          })
        ),
      }),
      name: PropTypes.string,
    }),
  }),
  contextUri: PropTypes.string,
};

export default TrackRow;
