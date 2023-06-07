// spotifyService.ts
import axios from 'axios';

export class SpotifyService {
  // SpotifyService is a singleton class, so we need to store the instance
  private static instance: SpotifyService;
  // We need to store the access token so we can use it in our requests
  private accessToken: string | null = null;

  // The constructor is private so we can't instantiate the class from outside
  private constructor() {}

  // Public method to get a shared instance of SpotifyService
  public static getInstance(): SpotifyService {
    // If the shared instance does not exist, create it
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }

    // Return the shared instance
    return SpotifyService.instance;
  }

  // Method to authenticate with the Spotify API
  public async authenticate(clientId: string, clientSecret: string) {
    // Define the parameters for the authentication request
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    // Define the headers for the authentication request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
    };

    try {
      // Make the authentication request
      const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers });

      // Store the access token
      this.accessToken = response.data.access_token;
    } catch (error) {
      // Log any errors that occur during authentication
      console.error('Failed to authenticate with Spotify API', error);
    }
  }

  // Method to get an artist's albums from the Spotify API
  public async getArtistAlbums(artistId: string) {
    // If not authenticated, log an error and return
    if (!this.accessToken) {
      console.error('Not authenticated with Spotify API');
      return;
    }

    // Define the headers for the request
    const headers = {
      'Authorization': 'Bearer ' + this.accessToken,
    };

    try {
      // Make the request for the artist's albums
      const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, { headers });

       // Return the albums
      return response.data.items;
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Failed to fetch artist albums from Spotify API', error);
    }
  }
  // Method to get an album's tracks from the Spotify API
  public async getAlbumTracks(albumId: string) {
    // If not authenticated, log an error and return
    if (!this.accessToken) {
      console.error('Not authenticated with Spotify API');
      return;
    }
    // Define the headers for the request
    const headers = {
      'Authorization': 'Bearer ' + this.accessToken,
    };

    try {
      // Make the request for the album's tracks
      const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, { headers });

      // Return the tracks
      return response.data.items;
    } catch (error) {
      console.error('Failed to fetch album tracks from Spotify API', error);
    }
  }
}
