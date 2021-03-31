import styled from "styled-components";
import PropTypes from "prop-types";

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
`;

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

const AlbumImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const TrackRow = ({ idx, track }) => {
  const getDateToDisplay = date => {
    const dateParts = date.toDateString().split(" ");
    return `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
  };

  const getDurationToDisplay = durationInMs => {
    const durationInSec = Math.floor(durationInMs / 1000);
    const minutes = Math.floor(durationInSec / 60);
    const seconds = durationInSec % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // TODO remove spans
  return (
    <StyledTrackRow>
      <TrackData>{idx + 1}</TrackData>
      <TrackData>
        <AlbumImage src={track.track.album.images[2].url} />
        <span className="ellipsis-one-line">{track.track.name}</span>
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
            url: PropTypes.string
          })
        )
      }),
      name: PropTypes.string
    })
  })
};

export default TrackRow;
