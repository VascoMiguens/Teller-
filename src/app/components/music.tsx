"use client"
import { useEffect, useState } from "react";
import { SpotifyService } from "../../../services/spotifyService";
import { MdNavigateNext, MdNavigateBefore} from 'react-icons/md';
import Image from "next/image";

// Album type
type Album = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
};

// Track type
type Track = {
  id: string;
  name: string;
  preview_url: string;
};

const Music = () => {
    // State for albums
    const [albums, setAlbums] = useState<Album[]>([]);
    // State for current album index
    const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
    // State for current track index
    const [tracks, setTracks] = useState<Track[]>([]);
    // Spotify service
    const spotifyService = SpotifyService.getInstance();
    

    useEffect(() => {
    const fetchData = async () => {
        // Authenticate with Spotify
        await spotifyService.authenticate(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`, `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`);
        // Get artist albums
        const artistAlbums = await spotifyService.getArtistAlbums('3Hdsk1E0X4oe9nHDYJqQYY');
        // Set albums
        setAlbums(artistAlbums);
    };
    fetchData();
    }, []);

    // Select album
    const selectAlbum = async (albumId: string) => {
        // Get album tracks
        const albumTracks = await spotifyService.getAlbumTracks(albumId);
        // Set tracks
        setTracks(albumTracks);
    };

    // Previous album
    const prevAlbum = () => {
        // If current album index is 0, set it to the last album index
        setCurrentAlbumIndex((prevIndex) =>
        prevIndex === 0 ? albums.length - 1 : prevIndex - 1
        );
    };

    /// Next album
    const nextAlbum = () => {
        // If current album index is the last index, set it to 0
        setCurrentAlbumIndex((prevIndex) =>
        prevIndex === albums.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    // Select current album
    useEffect(() => {
        // Get current album
        const currentAlbum = albums[currentAlbumIndex];
        // If current album exists, select it
        if (currentAlbum) {
            selectAlbum(currentAlbum.id);
        }
    }, [currentAlbumIndex, albums]);

    return (
    <div className="bg-black h-screen relative">
        <div className="bg-overlay h-screen">
            <h1 className="text-7xl text-gray-500 flex justify-end font-bold mr-5 p-5">Music</h1>
            <div className="flex justify-center">
                <div className="ml-10 flex flex-col basis-1/2 mr-5">
                    <div className="flex text-white justify-between">
                        <button className="prev text-5xl" onClick={prevAlbum}>
                            <MdNavigateBefore/>
                        </button>
                        <div className="flex items-center">
                            <img src={albums[currentAlbumIndex]?.images[0]?.url}
                            alt={albums[currentAlbumIndex]?.name} className="mr-10" width={50} />
                            <p className="text-2xl">
                                {albums[currentAlbumIndex]?.name}   
                            </p>
                        </div>
                        <button className="next text-5xl" onClick={nextAlbum}>
                            <MdNavigateNext />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <img src={albums[currentAlbumIndex]?.images[0]?.url} alt={albums[currentAlbumIndex]?.name}  className="mt-5" width={250}/>
                    </div>
                </div>
                <div className="ml-10 basis-1/3 flex justify-start items-start mt-10">
                    <div className="track-list text-white">
                        <p className="text-2xl mb-5">Song List</p>
                        {tracks.length > 0 ? (
                            tracks.map((track) => (
                                <div
                                key={track.id}
                                className={"track-item"}
                                >
                                <p>{track.name}</p>
                                </div>
                            ))
                        ) : (
                            <p>No tracks available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Music;