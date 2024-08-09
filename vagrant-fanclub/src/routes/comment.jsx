import axios from "axios";

export default function Comment() {
  axios
    .get("http://localhost:8080/private/auth/comment", {
      withCredentials: true,
    })
    .then((res) => {
      alert(JSON.stringify(res));
    })
    .catch((err) => alert(err));

  return <h1>not yet implemented</h1>;
}
