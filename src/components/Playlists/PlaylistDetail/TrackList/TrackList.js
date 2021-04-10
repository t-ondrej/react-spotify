import TrackRow from "./TrackRow";
import TrackListHeader from "./TrackListHeader";
import PropTypes from "prop-types";

const TrackList = ({ playlist }) => {
  return (
    <>
      <TrackListHeader />

      {playlist.tracks.items.map((track, idx) => (
        <TrackRow
          key={track.track.id}
          track={track}
          idx={idx}
          contextUri={playlist.uri}
        />
      ))}
    </>
  );
};

TrackList.propTypes = {
  playlist: PropTypes.shape({
    uri: PropTypes.string,
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          track: PropTypes.shape({}),
        })
      ),
    }),
  }),
};

export default TrackList;
