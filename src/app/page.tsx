"use client"
import AboutMe from "./components/aboutMe";
import Music from "./components/music";
import VideoBackground from "./components/videobackground";
import Videos from "./components/videos";

const Home: React.FC = () => {
  

  return (
    <div className="">
      <VideoBackground />
      <AboutMe />
      <Music />
      <Videos />
    </div>
    

  );
};


export default Home;

