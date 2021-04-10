import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCurrentTrack = styled.div`
  display: flex;
  height: fit-content;
  grid-area: current-track;
`;

const TrackName = styled.span`
  font-size: 14px;
  color: #fff;
`;

const ArtistsNames = styled.span`
  font-size: 11px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 14px;
`;

const CurrentTrack = ({ track }) => {
  return (
    <StyledCurrentTrack>
      <img style={{ height: "56px" }} alt="Album" src={track?.album?.images[2].url} />
      <TextWrapper>
        <TrackName>{track?.name}</TrackName>
        <ArtistsNames>
          {track?.artists.map(({ name }) => name).join(", ")}
        </ArtistsNames>
      </TextWrapper>
    </StyledCurrentTrack>
  );
};

CurrentTrack.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string,
    album: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
    }),
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};

export default CurrentTrack;
