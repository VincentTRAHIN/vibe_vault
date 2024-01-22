import SpotifyApiConnexion from "../src/utils/SpotifyApiConnexion.js";
import { spotifyAuthorizedEndpoint } from "../src/utils/SpotifyApiConnexion.js";

describe("SpotifyApiConnexion", () => {
  describe("getAccessToken", () => {
    // Moche the global.location object
    const mockLocation = new URL("https://example.com");

    beforeAll(() => {
      // backup the real location
      global._originalLocation = global.location;
      // define the getter for 'href' to be writable
      Object.defineProperty(window, "location", {
        writable: true,
        value: mockLocation,
      });
    });

    afterAll(() => {
      // restore the original location
      global.location = global._originalLocation;
    });

    it("should return the access token if it exists", () => {
      // set the href property on the mock location
      mockLocation.href =
        "https://example.com?access_token=123456&expires_in=3600";

      const accessToken = SpotifyApiConnexion.getAccessToken();

      expect(accessToken).toBe("123456");
    });

    it("should redirect to Spotify authorized endpoint if access token does not exist", () => {
      // define spotifyAuthorizedEndpoint with the expected value
      const spotifyAuthorizedEndpoint =
        "https://example.com/?access_token=123456&expires_in=3600";

      SpotifyApiConnexion.getAccessToken();

      // check that the spotify authorized endpoint was called
      expect(mockLocation.href).toBe(spotifyAuthorizedEndpoint);
    });
  });

  describe("search", () => {
    it("should fetch and return search results", async () => {
      // BEGIN: mock fetch
      const mockResponse = {
        tracks: {
          items: [
            {
              id: "1",
              name: "Track 1",
              artists: [{ name: "Artist 1" }],
              album: { name: "Album 1" },
              uri: "spotify:track:1",
            },
            {
              id: "2",
              name: "Track 2",
              artists: [{ name: "Artist 2" }],
              album: { name: "Album 2" },
              uri: "spotify:track:2",
            },
          ],
        },
      };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });
      // END: mock fetch

      const results = await SpotifyApiConnexion.search("query");

      expect(results).toEqual([
        {
          id: "1",
          name: "Track 1",
          artist: "Artist 1",
          album: "Album 1",
          uri: "spotify:track:1",
        },
        {
          id: "2",
          name: "Track 2",
          artist: "Artist 2",
          album: "Album 2",
          uri: "spotify:track:2",
        },
      ]);

      // BEGIN: restore fetch
      global.fetch.mockRestore();
      // END: restore fetch
    });

    it("should return an empty array if no tracks are found", async () => {
      // BEGIN: mock fetch
      const mockResponse = {
        tracks: null,
      };
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });
      // END: mock fetch

      const results = await SpotifyApiConnexion.search("query");

      expect(results).toEqual([]);

      // BEGIN: restore fetch
      global.fetch.mockRestore();
      // END: restore fetch
    });
  });

  describe("savePlaylist", () => {
    let accessToken = "123456";
    it("should create a new playlist and add tracks to it", async () => {
      // BEGIN: mock fetch
      const mockResponse = {
        id: "playlistId",
      };
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce({ id: "userId" }),
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
      // END: mock fetch

      const playlistName = "My Playlist";
      const trackUris = ["spotify:track:1", "spotify:track:2"];

      await SpotifyApiConnexion.savePlaylist(playlistName, trackUris);

      // BEGIN: assert fetch calls
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.spotify.com/v1/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.spotify.com/v1/users/userId/playlists`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "POST",
          body: JSON.stringify({ name: playlistName }),
        }
      );
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.spotify.com/v1/users/userId/playlists/playlistId/tracks`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),
        }
      );
      // END: assert fetch calls

      // BEGIN: restore fetch
      global.fetch.mockRestore();
      // END: restore fetch
    });

    it("should not create a new playlist if playlist name or track uris are missing", async () => {
      // BEGIN: mock fetch
      global.fetch = jest.fn();
      // END: mock fetch

      const playlistName = "";
      const trackUris = [];

      await SpotifyApiConnexion.savePlaylist(playlistName, trackUris);

      // BEGIN: assert fetch is not called
      expect(global.fetch).not.toHaveBeenCalled();
      // END: assert fetch is not called

      // BEGIN: restore fetch
      global.fetch.mockRestore();
      // END: restore fetch
    });
  });
});
