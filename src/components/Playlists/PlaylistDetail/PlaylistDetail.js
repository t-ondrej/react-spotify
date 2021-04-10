import TrackList from "./TrackList/TrackList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import PlaylistDetailHeader from "./PlaylistDetailHeader";

const PlaylistDetail = () => {
  const match = useRouteMatch();
  const [playlist, setPlaylist] = useState({});

  useEffect(
    () =>
      axios
        .get(`/playlists/${match.params.playlistId}`)
        .then((playlists) => setPlaylist(playlists)),
    [match.params.playlistId]
  );

  return (
    <>
      {playlist?.tracks && (
        <>
          <PlaylistDetailHeader playlist={playlist} />
          <TrackList playlist={playlist}/>
        </>
      )}
    </>
  );
};

export default PlaylistDetail;
