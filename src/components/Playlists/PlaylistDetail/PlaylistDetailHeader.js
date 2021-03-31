import styled from "styled-components";

const StyledPlaylistDetailHeader = styled.div`
  display: flex;
  margin: 24px 0;
`;

const PlaylistMetaName = styled.h2`
  font-size: 12px;
`;

const PlaylistName = styled.h1`
  ${({ name }) => {
    const fontSize = name.length > 20 ? 48 : 96;

    return `
    padding: 8px 0px;
    font-size: ${fontSize}px;
    line-height: ${fontSize}px;
    color: white;

    @media screen and (max-width: 1400px) {
      font-size: 48px;
    }

    @media screen and (max-width: 1200px) {
      font-size: 24px;
    }
  `;
  }}
`;

const PlaylistImage = styled.img`
  width: 232px;
  height: 232px;
  margin-right: 24px;
  float: left;
`;

const PlaylistDescription = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: normal;
  text-transform: none;
`;

const PlaylistTBD = styled.p`
  margin-top: 8px;
  font-size: 14px;
`;

const PlaylistInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

// TODO axios remove need for data destructure
const PlaylistDetailheader = ({ playlist }) => {
  const getTotalTime = () =>
    playlist.tracks.items
      .map(({ track }) => track.duration_ms)
      .reduce((acc, curr) => acc + curr, 0);

  const getTotalTimeToDisplay = () => {
    const totalTimeInSeconds = getTotalTime() / 1000;
    const hours = Math.floor(totalTimeInSeconds / (60 * 60));
    if (hours > 0) {
      const minutes = Math.floor((totalTimeInSeconds % (60 * 60)) / 60);
      return `${hours} hr ${minutes} min`;
    }

    const minutes = Math.floor(totalTimeInSeconds / 60);
    const seconds = Math.floor(totalTimeInSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <StyledPlaylistDetailHeader>
      <PlaylistImage src={playlist.images[0].url} />

      <PlaylistInfoWrapper>
        <PlaylistMetaName>PLAYLIST</PlaylistMetaName>
        <PlaylistName name={playlist.name}>{playlist.name}</PlaylistName>
        <PlaylistDescription>{playlist.description}</PlaylistDescription>
        <PlaylistTBD>{`${playlist.owner.display_name} • ${
          playlist.tracks.total
        } songs, ${getTotalTimeToDisplay()}`}</PlaylistTBD>
      </PlaylistInfoWrapper>
    </StyledPlaylistDetailHeader>
  );
};

export default PlaylistDetailheader;
