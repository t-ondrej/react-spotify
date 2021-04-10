import { useState } from "react";
import { getAccessToken } from "../../services/tokenService";
import SpotifyContext from "./SpotifyPlayerContext";

const SpotifyPlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [ready, setReady] = useState();

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = getAccessToken();
    // eslint-disable-next-line no-undef
    const player = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });

    // Error handling
    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });
    player.addListener("playback_error", ({ message }) => {
      console.error(message);
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      setDeviceId(device_id);
      setReady(true);
      console.error("ready");
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    setPlayer(player);

    // Connect to the player!
    player.connect();
  };

  return (
    <SpotifyContext.Provider value={{ player, deviceId, ready }}>
      {children}
    </SpotifyContext.Provider>
  );
};

// TODO naming convention + default vs named exports, use css variables
export default SpotifyPlayerProvider;
