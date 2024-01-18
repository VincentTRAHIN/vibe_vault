const clientId = "3be8241b63e2457fb3618261c5649e8e";
const redirectUri = "http://localhost:3000/";
const scopes = "playlist-modify-public playlist-modify-private"; // Adjust scopes as needed
const spotifyAuthorizedEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

let accessToken;

const SpotifyApiConnexion = {
  // get the access token from the url
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

  // Implement Spotify search request
  search(term) {
    const accessToken = SpotifyApiConnexion.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        console.log(jsonResponse.tracks.items);
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default SpotifyApiConnexion;
