"use client"
import { useEffect, useState } from "react";
import { SpotifyService } from "../../../services/spotifyService";

type Album = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
};

const Music = () => {
    const [albums, setAlbums] = useState<Album[]>([]);

    const spotifyService = SpotifyService.getInstance();
    

    useEffect(() => {
    const fetchData = async () => {
        // Authenticate with Spotify
        await spotifyService.authenticate(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`, `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`);
        // Get artist albums
        const artistAlbums = await spotifyService.getArtistAlbums('3Hdsk1E0X4oe9nHDYJqQYY');
        // Set albums
        setAlbums(artistAlbums);
        console.log(artistAlbums);
    };
    fetchData();
    }, []);

    return (
    <div className="bg-black h-screen relative">
        <div className="bg-overlay h-screen">
            <h1 className="text-7xl text-gray-500 flex justify-end font-bold mr-5 p-5">Music</h1>
            <div className="flex items-center justify-center">
                <div className="ml-10 basis-1/2 flex justify-center mr-5">
                    {albums.map(album => (
                        <div key={album.id}>
                        <h2>{album.name}</h2>
                        <img src={album.images[0]?.url} alt={album.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default Music;