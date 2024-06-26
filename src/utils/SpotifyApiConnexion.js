const clientId = "3be8241b63e2457fb3618261c5649e8e";
const redirectUri = "http://localhost:5173/";
const scopes =
  "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative"; // Adjust scopes as needed
const spotifyAuthorizedEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

let accessToken;
let userId;

const SpotifyApiConnexion = {
  // get the access token from the url
  getAccessToken() {
    // Check if the access token is already available and return it if so
    if (accessToken) {
      console.log("Using existing access token:", accessToken);
      return accessToken;
    }

    // Extract the access token and expiration time from the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      console.log("New access token:", accessToken);

      // Clear the access token after it expires and force re-authentication
      window.setTimeout(() => {
        console.log("Access token has expired, clearing token.");
        accessToken = "";
      }, expiresIn * 1000); // Convert expiresIn to milliseconds

      // Clear the access token from the URL without reloading the page
      window.history.pushState("accessToken", null, "/");

      return accessToken;
    } else {
      // Only redirect for authorization if not already in the process of doing so
      // This prevents infinite redirects in cases where authorization fails
      const currentURL = window.location.href;
      if (
        !currentURL.includes("access_token") &&
        !currentURL.includes("error")
      ) {
        console.log("Redirecting for authorization");
        window.location.assign(spotifyAuthorizedEndpoint);
      } else {
        console.log("Authorization error encountered.");
      }
    }
  },

  // Implement Spotify search request
  search(term) {
    const accessToken = SpotifyApiConnexion.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}&limit=50`,
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
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          preview_url: track.preview_url,
        }));
      });
  },
  //Get the current user's ID
  getCurrentUserId() {
    const accessToken = SpotifyApiConnexion.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };

    if (userId) {
      return Promise.resolve(userId);
    }

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return userId;
      });
  },

  // Implement get the user's playlists
  getUserPlaylists() {
    accessToken = SpotifyApiConnexion.getAccessToken();
    return SpotifyApiConnexion.getCurrentUserId().then((currentUserId) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      console.log("Fetching playlists for user ID:", currentUserId);

      return fetch(
        `https://api.spotify.com/v1/users/${currentUserId}/playlists`,
        {
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((jsonResponse) => {
          console.log("Playlists fetched:", jsonResponse.items);
          return jsonResponse.items.map((playlist) => ({
            id: playlist.id,
            name: playlist.name,
          }));
        });
    });
  },
  // Implement get a playlist's tracks
  getPlaylist(playlistId) {
    const accessToken = this.getAccessToken();
    // Créer un en-tête pour les requêtes
    const headers = { Authorization: `Bearer ${accessToken}` };

    // Premièrement, récupérer les détails de la playlist pour obtenir le nom
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((playlistDetails) => {
        // Ensuite, récupérer les pistes de la playlist
        return fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { headers: headers }
        )
          .then((response) => response.json())
          .then((jsonResponse) => {
            const tracks = jsonResponse.items.map((item) => ({
              id: item.track.id,
              name: item.track.name,
              artist: item.track.artists
                .map((artist) => artist.name)
                .join(", "),
              album: item.track.album.name,
              uri: item.track.uri,
              preview_url: item.track.preview_url,
            }));
            // Retourner à la fois le nom et les pistes de la playlist
            return {
              name: playlistDetails.name,
              tracks: tracks,
            };
          });
      });
  },

  // Implement save a user's playlist to their Spotify account
  savePlaylist(playlistName, trackUris, playlistId) {
    console.log("Starting savePlaylist", {
      playlistName,
      trackUris,
      playlistId,
    });
    if (!playlistName || !trackUris.length) {
      console.log("No playlist name or tracks provided");
      return Promise.resolve();
    }

    return this.getCurrentUserId().then((userId) => {
      console.log("Got current user ID:", userId);
      const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
      let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
      let method = "POST";
      let body = JSON.stringify({ name: playlistName });

      if (playlistId) {
        console.log("Updating existing playlist");
        url += `/${playlistId}`;
        method = "PUT";
      } else {
        console.log("Creating new playlist");
      }

      return fetch(url, { headers, method, body })
        .then((response) => {
          if (!response.ok) {
            console.error("Response not OK", response.statusText);
            throw new Error("Request failed with status " + response.status);
          }
          return response.text(); // Use text() here to avoid JSON parsing error for empty response
        })
        .then((text) => {
          const jsonResponse = text ? JSON.parse(text) : {};
          console.log("Response from playlist operation:", jsonResponse);

          // if a new playlist was created, add tracks to it
          if (!playlistId && jsonResponse.id) {
            const newPlaylistId = jsonResponse.id;
            console.log("Adding tracks to new playlist", newPlaylistId);
            return fetch(
              `https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`,
              {
                headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            )
              .then((response) => {
                if (!response.ok) {
                  console.error(
                    "Adding tracks response not OK",
                    response.statusText
                  );
                  throw new Error(
                    "Adding tracks failed with status " + response.status
                  );
                }
                return response.json();
              })
              .then((jsonResponse) =>
                console.log("Tracks added response:", jsonResponse)
              );
          }
        })
        .catch((error) => console.error("Error in savePlaylist:", error));
    });
  },
};

export default SpotifyApiConnexion;
