import { useEffect, useState } from "react";
import axios from "axios";
export default function Upload() {
  // Check if user is logged in
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const host = window.location.hostname;
    axios
      .get(`http://${host}:8080/private/auth/session`, {
        withCredentials: true,
      })
      .then(() => {
        setIsLogged(true);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const host = window.location.hostname;
    const formData = new FormData();
    formData.append("videoName", e.target.videoName.value);
    formData.append("videoDescription", e.target.videoDescription.value);
    formData.append("video", e.target.video.files[0]);
    formData.append("thumbnail", e.target.thumbnail.files[0]);

    alert(formData.get("videoName"));

    axios
      .post(`http://${host}:8080/private/auth/upload`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        alert(JSON.stringify(res));
      })
      .catch((err) => alert(err.toString()));
  };

  if (isLogged) {
    return (
      <body>
        <form
          onSubmit={handleSubmit}
          action="/upload"
          method="POST"
          enctype="multipart/form-data"
        >
          <label for="videoName">Video Name:</label>
          <input type="text" name="videoName" id="videoName" required />
          <br />

          <label for="videoDescription">Video Description:</label>
          <textarea
            name="videoDescription"
            id="videoDescription"
            required
          ></textarea>
          <br />

          <label for="video">Select Video:</label>
          <input type="file" name="video" accept="video/*" required />
          <br />

          <label for="thumbnail">Select Thumbnail:</label>
          <input type="file" name="thumbnail" accept="image/*" required />
          <br />

          <button type="submit">Upload Video</button>
        </form>
      </body>
    );
  } else {
    return <h1>USER NOT LOGGED IN</h1>;
  }
}
