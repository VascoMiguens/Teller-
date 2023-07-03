import { useState } from "react";
import YouTube from "react-youtube";
import { AiOutlineClose} from "react-icons/ai";

const Videos = () => {
  const [mediaItems, setMediaItems] = useState<string[]>([
    "https://www.youtube.com/watch?v=GA4GE9EAPz0",
    "_Teller__WnB.png",
    "8fb7fa3f-b30a-4e5d-afef-fc84f1a08f5b.JPG",
    "5d20a8bc-94f9-4752-85e8-5a5f41bba488.JPG",
    "https://www.youtube.com/watch?v=uaRhoI5Ji6U",
    "IMG_3791.JPG",
    "6d5d9e65-1bc1-48a9-a804-8f457f24fea8.JPG",
    "IMG_3793.JPG",
    "https://www.youtube.com/watch?v=onzDZ8KkyPg",
    "https://www.youtube.com/watch?v=m8cbo2kCjk8",
    "IMG_3795.JPG",
    "_Teller__BnW.png",
    "60c150e7-d636-4284-9e43-d832fe55e2f9.JPG",
    "https://www.youtube.com/watch?v=r4oDPwnyzyw",
    "c422af04-8f96-46b5-a0e6-e30fe923dfc2.JPG"
  ]);

  const videoNames = useState<string[]>([
    "estorias",
    "Livre",
    "Ponte",
    "Dois Passos",
    "Caminhada"
  ])

  const [openModal, setOpenModal] = useState(false);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);

  const openVideoModal = (videoId: string) => {
    setVideoId(videoId);
    setOpenModal(true);
  };

  const closeVideoModal = () => {
    setOpenModal(false);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      fs: 1
    }
  };

  return (
    <div id="videos" className="h-full w-full justify-center items-center relative bg-white pb-5">
      <h1 className="text-5xl text-gray-500 flex justify-start font-bold mr-5 p-5">Videos</h1>
      <div className="flex justify-center">
        <div className="w-11/12 media-container grid grid-cols-4 gap-1">
          {mediaItems.map((item, index) => {
            if (item.endsWith(".JPG") || item.endsWith(".png")) {
              return (
                <img
                  key={`image-${index}`}
                  src={`/images/${item}`}
                  alt="Image"
                  className={`w-full h-full object-cover `}
                />
              );
            } else if (item.includes("https://www.youtube.com/watch?v=")) {
              const videoId = item.split("=").pop();
              return (
                <div
                  key={`video-${index}`}
                  onClick={() => openVideoModal(videoId || "")}
                  className={`relative cursor-pointer hover:scale-105 hover:z-50 hover:transition duration-300 col-span-2`}
                >
                  <img className="h-full w-full object-cover" src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="Video Thumbnail" />
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <svg className="fill-white w-36 h-36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="absolute text-white bottom-5 right-10"></p>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      {openModal && (
        <div className="video-modal">
          <div className="video-modal-content">
            <YouTube videoId={videoId} opts={opts} />
            <button className="video-modal-close text-4xl" onClick={closeVideoModal}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;