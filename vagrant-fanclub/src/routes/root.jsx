// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import VideoCard from "../components/Card";
import Navbar from "../components/Navbar";

export default function Root() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/public/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div class="row mx-2 my-2">
        {videos.map((video, i) => (
          <VideoCard video={video} />
        ))}
      </div>
    </div>
  );
}
