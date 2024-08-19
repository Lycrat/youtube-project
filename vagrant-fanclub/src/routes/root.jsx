// src/App.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../App.css";
import VideoCard from "../components/Card";
import Navbar from "../components/Navbar";

export default function Root() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [navbarOffset, setNavbarOffset] = useState(0);

  // set the navbar offset so we know how tall the navigation bar is
  // need this for fixed-top navigation bar
  const handleNavbarOffset = (height) => {
    setNavbarOffset(height);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/public/videos");
        const fetchedVids = response.data;

        setVideos(fetchedVids);
        setFilteredVideos(fetchedVids);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, []);

  const handleSearch = (query) => {
    const filtered = videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(query.toLowerCase()),
    );
    if (query.length) {
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  };
  return (
    <div className="App" style={{ marginTop: `${navbarOffset}px` }}>
      <Navbar
        onHeightChange={handleNavbarOffset}
        videos={videos}
        onSearch={handleSearch}
      />
      <div class="container">
        <div class="row mx-2 my-2">
          {filteredVideos.map((video, i) => (
            <VideoCard video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
