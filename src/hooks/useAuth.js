import { isAccessTokenExpired } from "../services/tokenService";

const SPOTIFY_CONFIG = {
  clientId: "11bc7dba81f34591a3a740f64072cdf1",
  redirectUri: "http://localhost:3000",
  scopes: [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "streaming",
  ],
};

export function login() {
  window.location.href =
    "https://accounts.spotify.com/authorize?response_type=token" +
    `&client_id=${SPOTIFY_CONFIG.clientId}` +
    `&scope=${SPOTIFY_CONFIG.scopes.join("%20")}` +
    `&redirect_uri=${SPOTIFY_CONFIG.redirectUri}` +
    "&show_dialog=true";
}

export default function useAuth() {
  const isAuthenticated = !isAccessTokenExpired();

  return [isAuthenticated, login];
}
