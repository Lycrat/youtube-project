import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const VideoContext = createContext();
let host = window.location.hostname;
const useVideoContext = () => {
  const context = useContext(VideoContext);

  if (context === undefined) {
    throw new Error("useVideoContext was used outside of its provider");
  }
  return context;
};
const VideoContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [communityVideos, setCommunityVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://${host}:8080/public/videos`);
        setVideos(response.data);
        setFilteredVideos(response.data);
      } catch (err) {
        alert(err.toString());
      }
    };

    fetchVideos();

    const fetchCommunityVideos = async () => {
      try {
        const response = await axios.get(
          `http://${host}:8080/public/community/videos`,
        );
        setCommunityVideos(response.data);
      } catch (err) {
        // alert(`http://${host}:8080/public/community/videos`);
      }
    };

    fetchCommunityVideos();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVideos(videos);
      return;
    }

    const filtered = videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredVideos(filtered);
  }, [searchQuery, videos]);

  return (
    <VideoContext.Provider
      value={{
        videos: filteredVideos,
        setSearchQuery,
        searchQuery,
        communityVideos: communityVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoContextProvider, useVideoContext };
