import { useEffect, useState, useRef } from "react";
import { SpotifyService } from "../../../services/spotifyService";
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { RiYoutubeLine, RiAppleLine, RiSpotifyLine } from 'react-icons/ri';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { RxSpeakerLoud } from 'react-icons/rx';
import Link from "next/link";

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
  external_urls: { spotify: string };
};

// TrackLink type
type TrackLink = {
  id: string;
  youtubeLink?: string;
  spotifyLink?: string;
  appleLink?: string;
};

const Music = () => {
  // Spotify service
  const spotifyService = SpotifyService.getInstance();
  // State for albums
  const [albums, setAlbums] = useState<Album[]>([]);
  // State for current album index
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  // State for tracks
  const [tracks, setTracks] = useState<Track[]>([]);
  // State for current track index
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  // State for current time
  const [currentTime, setCurrentTime] = useState(0);
  // State for duration
  const [duration, setDuration] = useState(0);
  // State for track links
  const [trackLinks, setTrackLinks] = useState<TrackLink[]>([]);
  // State for track click
  const [isTrackClicked, setIsTrackClicked] = useState(false);
  // Audio ref
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Authenticate with Spotify
      await spotifyService.authenticate(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`, `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`);
      // Get artist albums
      const artistAlbums = await spotifyService.getArtistAlbums('3Hdsk1E0X4oe9nHDYJqQYY');
      // Set albums
      setAlbums(artistAlbums);
      // Update track links based on current album
      const currentAlbum = artistAlbums[currentAlbumIndex];
      if (currentAlbum) {
        const currentAlbumLinks = albumLinks.filter((link) => link.id === currentAlbum.id);
        setTrackLinks(currentAlbumLinks);
      }
    };
    fetchData();
  }, []);

  // Select album
  const selectAlbum = async (albumId: string) => {
    // Get album tracks
    const albumTracks = await spotifyService.getAlbumTracks(albumId);
    // Set tracks
    setTracks(albumTracks);
    // Select the first track
    setCurrentTrackIndex(0);
  };

  // Previous album
  const prevAlbum = () => {
    // If current album index is 0, set it to the last album index
    setCurrentAlbumIndex((prevIndex) =>
      prevIndex === 0 ? albums.length - 1 : prevIndex - 1
    );
    handleTrackEnd();
  };

  // Next album
  const nextAlbum = () => {
    // If current album index is the last index, set it to 0
    setCurrentAlbumIndex((prevIndex) =>
      prevIndex === albums.length - 1 ? 0 : prevIndex + 1
    );
    handleTrackEnd();
  };

  useEffect(() => {
    // Get current album
    const currentAlbum = albums[currentAlbumIndex];
    // If current album exists, select it
    if (currentAlbum) {
      selectAlbum(currentAlbum.id);
      // Update track links based on current album
      const currentAlbumLinks = albumLinks.filter((link) => link.id === currentAlbum.id);
      setTrackLinks(currentAlbumLinks);
    }
  }, [currentAlbumIndex, albums]);

  useEffect(() => { 
    if (audioRef.current) {
      // Load the track
      audioRef.current.load();
    }
    // Load the audio track when the current track index changes
  }, [currentTrackIndex]);

  const updateTime = () => {
    if (audioRef.current) {
      // Update the current time of the track
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      // Update the duration of the audio track
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnd = () => {
    // Reset the current time to 0
    setCurrentTime(0);
    // Set track click state to false
    setIsTrackClicked(false);
  };


  // Play or pause track
  const handlePlayPause = (index: number) => {
    // If current track index is the same as the index of the track that was clicked, play or pause it
    if (currentTrackIndex === index && audioRef.current) {
      if (audioRef.current.paused) {
        // Play the audio track
        audioRef.current.play();
        // Set track click state to true
        setIsTrackClicked(true);
      } else {
        // Pause the audio track
        audioRef.current.pause();
        // Set track click state to false
        setIsTrackClicked(false);
      }
    } else {
      // Update the current track index
      setCurrentTrackIndex(index);
      // Set track click state to true
      setIsTrackClicked(true);
    }
  };

  const albumLinks = [
    {
      id: "2pFe8JrKqbVjTRDTUs2lMo",
      youtubeLink: "https://www.youtube.com/watch?v=7aKiT59q-_M&list=OLAK5uy_nRB2thk9sk_C1ItGiu-LftbE7ugM_GRw4",
      spotifyLink: "https://open.spotify.com/intl-pt/album/2pFe8JrKqbVjTRDTUs2lMo",
      appleLink: "https://music.apple.com/pt/album/meta-morphia/1442159727"
    },
    {
      id: "7lMNS9CKPJRzQ6vbrcBRWT",
      youtubeLink: "https://www.youtube.com/watch?v=GA4GE9EAPz0",
      appleLink: "https://music.apple.com/pt/album/est%C3%B3rias-single/1676122032",
      spotifyLink: "https://open.spotify.com/intl-pt/track/42zxxvC4BmI6SLtwKeVxEG"
    },
    {
      id: "4Pl2Pj3890qJtygYbXLSqT",
      youtubeLink: "https://www.youtube.com/watch?v=uaRhoI5Ji6U",
      spotifyLink: "https://open.spotify.com/intl-pt/album/4Pl2Pj3890qJtygYbXLSqT",
      appleLink: "https://music.apple.com/pt/album/livre-single/1541490307"
    },
    {
      id: "7Dbncbf8YbyWA5QtCm8f2W",
      youtubeLink: "https://www.youtube.com/watch?v=m8cbo2kCjk8",
      spotifyLink: "https://open.spotify.com/intl-pt/album/7Dbncbf8YbyWA5QtCm8f2W",
      appleLink: "https://music.apple.com/pt/album/dois-passos-single/1528351712"
    },
    {
      id: "7H3poWaZO5mAGLDe9r05Pu",
      youtubeLink: "https://www.youtube.com/watch?v=onzDZ8KkyPg",
      spotifyLink: "https://open.spotify.com/intl-pt/album/7H3poWaZO5mAGLDe9r05Pu",
      appleLink: "https://music.apple.com/pt/album/ponte-single/1514973233"
    },
  ];

  return (
    <div className="h-screen w-full justify-center items-center relative bg-black">
      <h1 className="text-5xl text-gray-500 flex justify-end font-bold mr-5 p-3">Music</h1>
      <div className="flex justify-between w-full px-28 mb-0 mt-0 ">
        <button className="prev text-5xl text-slate-800 hover:text-slate-50" onClick={prevAlbum}>
          <MdNavigateBefore />
        </button>
        <div className="flex items-center justify-start text-white">
          <img src={albums[currentAlbumIndex]?.images[0]?.url}
            alt={albums[currentAlbumIndex]?.name} className="mr-10" width={50} />
          <p className="text-2xl">
            {albums[currentAlbumIndex]?.name}
          </p>
        </div>
        <button className="next text-5xl text-slate-800 hover:text-slate-50" onClick={nextAlbum}>
          <MdNavigateNext />
        </button>
      </div>
      <div className="flex justify-center h-4/6 px-24 mt-5">
        <div className="basis-1/2">
          <div className="track-list text-white">
            <div className="album-cover flex justify-center w-full">
              <img src={albums[currentAlbumIndex]?.images[0]?.url} alt={albums[currentAlbumIndex]?.name} className="w-4/6" />
            </div>
            {trackLinks.map((trackLink) => (
              <ul key={trackLink.id} className="flex justify-center mt-3">
                <li key={trackLink.id} className="flex text-5xl gap-12 mt-5">
                  {trackLink.youtubeLink && (
                    <Link
                      href={trackLink.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                    >
                      <RiYoutubeLine />
                    </Link>
                  )}
                  {trackLink.spotifyLink && (
                    <Link
                      href={trackLink.spotifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                    >
                      <RiSpotifyLine />
                    </Link>
                  )}
                  {trackLink.appleLink && (
                    <Link
                      href={trackLink.appleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300"
                    >
                      <RiAppleLine />
                    </Link>
                  )}
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className="flex flex-col basis-1/2 relative py-0">
          {tracks.length > 0 ? (
            tracks.map((track, index) => {
              return (
                <div
                  key={track.id}
                  className={`flex flex-col hover:bg-slate-800 p-1 justify-between cursor-pointer w-5/6 text-white ${
                    index === currentTrackIndex && isTrackClicked ? "active" : ""
                  }`}
                  onClick={() => handlePlayPause(index)}
                >
                  <div className="flex items-center">
                    <div className="flex items-center flex-1">
                      {(isTrackClicked && index === currentTrackIndex) ? (
                        <AiOutlinePauseCircle
                          className="text-xl mr-2 cursor-pointer"
                          
                        />
                      ) : (
                        <AiOutlinePlayCircle
                          className="text-xl mr-2 cursor-pointer"
                        />
                      )}
                      <p className="text-xl">{index + 1}. {track.name}</p>
                    </div>
                    <div className="flex items-center">
                      {(isTrackClicked && index === currentTrackIndex) && (
                        <RxSpeakerLoud className="text-xl" />
                      )}
                    </div>
                  </div>
                  {(isTrackClicked && index === currentTrackIndex) ? (
                    <div className="audio-player mt-2">
                      <audio
                        ref={audioRef}
                        src={tracks[currentTrackIndex]?.preview_url}
                        className="custom-audio-player"
                        onTimeUpdate={updateTime}
                        onLoadedMetadata={updateDuration}
                        onEnded={handleTrackEnd}
                        autoPlay={isTrackClicked}
                      />
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p>No tracks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Music;
