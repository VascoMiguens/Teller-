"use client"
import YouTube from 'react-youtube';
import {BiVolumeMute, BiVolumeFull} from 'react-icons/bi';
import React, { useState, useEffect } from 'react';


const VideoBackground = () => {
  //Video ID
  const videoId = 'GA4GE9EAPz0';

  //State for mute/unmute
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  //Toggle mute/unmute effect
  useEffect(() => {
    if (player) {
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
      }
    }
  }, [player, isMuted]);

  //Handler for when the YouTube player is ready
  const handleOnReady = (event: any) => {
    const youtubePlayer = event.target;
    if (youtubePlayer) {
      setPlayer(youtubePlayer);
    }
  };

  //Handler for mute/unmute button click
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  //Handler for when the video ends
  const handleVideoEnd = () => {
    if (player) {
      //Seek to the start of the video
      player.seekTo(0); 
      //Play the video again
      player.playVideo(); 
    }
  };


  //Video options
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
      fs: 0,
      mute: 1,
      playsinline: 1,
      iv_load_policy: 3,
      start: 0,
      end: 180,
      autohide: 1,
      disablekb: 1,
      enablejsapi: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
      quality: 'hd1440',
    },
  };

  return (
    <>
      <div className="video-background">
        <YouTube className='youtube-video z-1' videoId={videoId} opts={opts} onReady={handleOnReady} onEnd={handleVideoEnd}/>
        <div className="z-2 flex justify-end absolute bottom-5 w-10 right-5 text-4xl text-white">
          <button onClick={handleToggleMute}>
            {isMuted ? <BiVolumeMute/> : <BiVolumeFull/>}
          </button>
        </div>
      </div>
      
    </>
  );
}

export default VideoBackground;
