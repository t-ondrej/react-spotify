import { useContext } from "react";
import SpotifyContext from "../components/Spotify/SpotifyPlayerContext";

export default function useSpotifyPlayer() {
  const context = useContext(SpotifyContext);

  if (context === undefined) {
    throw new Error(
      "useSpotifyPlayer must be used within a SpotifyPlayerContext"
    );
  }

  return context;
}
