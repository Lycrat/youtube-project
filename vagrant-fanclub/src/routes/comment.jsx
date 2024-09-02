import axios from "axios";
import { useState } from "react";

export default function Comment() {
  const [validated, setValidation] = useState(false);
  axios
    .get("http://localhost:8080/private/auth/comment", {
      withCredentials: true,
    })
    .then((res) => {
      setValidation(true);
    })
    .catch((err) => console.log(err));

  if (validated) {
    return <h1>not yet implemented</h1>;
  } else {
    return <h1>User not authorized</h1>;
  }
}
