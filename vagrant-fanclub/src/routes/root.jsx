// src/App.js
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useVideoContext } from "../contexts/VideoContext";
import axios from "axios";
import "../App.css";
import VideoCard from "../components/Card";
import Navbar from "../components/Navbar";

export default function Root() {
  const [navbarOffset, setNavbarOffset] = useState(0);

  const { videos, setSearchQuery } = useVideoContext();
  const { state } = useLocation();
  const { searchQuery } = state || "";
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="App" style={{ marginTop: `${navbarOffset}px` }}>
      <Navbar />
      <div class="container">
        <div class="row my-2">
          {videos.length > 0 ? (
            videos.map((video, i) => <VideoCard video={video} />)
          ) : (
            <p> No videos found. </p>
          )}
        </div>
      </div>
    </div>
  );
}
