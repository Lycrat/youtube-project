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

  const { communityVideos, setSearchQuery } = useVideoContext();
  const { state } = useLocation();
  const { searchQuery } = state || "";
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div style={{ marginTop: `${navbarOffset}px` }}>
      <Navbar />
      <div class="container">
        <div class="row mx-2 my-2">
          {communityVideos.length > 0 ? (
            communityVideos.map((video, i) => (
              <VideoCard
                video={JSON.parse(video.videoJson)}
                isCommunity={true}
              />
            ))
          ) : (
            <p> No videos found. </p>
          )}
        </div>
      </div>
    </div>
  );
}
