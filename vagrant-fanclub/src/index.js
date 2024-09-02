import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Root from "./routes/root";
import Login from "./routes/login";
import Comment from "./routes/comment";
import Community from "./routes/community";
import Video from "./routes/video";
import Upload from "./routes/upload";
import { VideoContextProvider } from "./contexts/VideoContext";
import axios from "axios";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

let host = window.location.hostname;
axios.defaults.baseURL = `http://${host}:8080`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <VideoContextProvider>
        <body>
          <Navbar />
          <Outlet />
        </body>
      </VideoContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "comment",
        element: <Comment />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "video",
        element: <Video />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
