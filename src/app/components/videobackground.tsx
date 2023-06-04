"use client"
import YouTube from 'react-youtube';



const VideoBackground = () => {
  //Video ID
  const videoId = 'GA4GE9EAPz0';

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
    },
  };

  return (
    <>
      <div className="video-background">
        <YouTube className='youtube-video z-1' videoId={videoId} opts={opts}/>
      </div>
      
    </>
  );
}

export default VideoBackground;
