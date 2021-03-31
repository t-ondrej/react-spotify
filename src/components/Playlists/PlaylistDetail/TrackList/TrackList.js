import TrackRow from "./TrackRow";
import TrackListHeader from "./TrackListHeader";
import PropTypes from "prop-types";

const TrackList = ({ tracks }) => {
  return (
    <>
      <TrackListHeader />

      {tracks.map((track, idx) => (
        <TrackRow key={track.track.id} track={track} idx={idx} />
      ))}
    </>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      track: PropTypes.shape({})
    })
  )
};

export default TrackList;
