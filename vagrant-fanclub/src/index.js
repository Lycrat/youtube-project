import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Root from "./routes/root";
import Login from "./routes/login";
import Comment from "./routes/comment";
import Community from "./routes/community";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
