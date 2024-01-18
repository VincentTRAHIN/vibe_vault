const clientId = "3be8241b63e2457fb3618261c5649e8e";
const redirectUri = "http://localhost:3000/";
const scopes = "playlist-modify-public playlist-modify-private"; // Adjust scopes as needed
const spotifyAuthorizedEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

let accessToken;

const SpotifyApiConnexion = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    // Check for expiration time match
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location = spotifyAuthorizedEndpoint;
    }
  },
};

export default SpotifyApiConnexion;
