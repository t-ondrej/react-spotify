import axios from "axios";
import { useState, useEffect } from "react";
import NavCategory from "../SideNav/NavCategory/NavCategory";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("/me/playlists?limit=50")
      .then((playlists) => setPlaylists(playlists.items));
  }, []);

  return (
    <NavCategory
      title="Playlists"
      items={playlists.map((playlist) => ({
        ...playlist,
        path: `/playlist/${playlist.id}`,
      }))}
    />
  );
};

export default Playlists;
