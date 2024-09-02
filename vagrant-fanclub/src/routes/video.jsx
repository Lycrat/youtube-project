import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
export default function Video() {
  const { state } = useLocation();
  const { video } = state;
  const desc = video.snippet.description;
  const videoTitle = video.snippet.title;
  const host = window.location.hostname;
  const videoThumbnail = video.snippet.thumbnails.maxres.url;
  const date = new Date(video.snippet.publishedAt);
  const uploadDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <React.Fragment>
      <div
        class="card"
        style={{ height: "100vh", backgroundColor: "#2C2C2C", color: "white" }}
      >
        <video
          controls
          width="600"
          class="card-img-top"
          style={{ maxHeight: "50vh" }}
          src={`http://${host}:8080/public/video/${videoTitle}`}
          poster={videoThumbnail}
          alt="Card image cap"
        />
        <div
          class="card-body"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <h5 class="card-title">{videoTitle}</h5>
          <p class="card-text">{desc}</p>
          <p class="card-text">
            <small>Uploaded: {uploadDate}</small>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}
