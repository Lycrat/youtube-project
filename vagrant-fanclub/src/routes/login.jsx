import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const host = window.location.hostname;
export default function Login() {
  const [loggedUser, setLoggedUser] = useState("Not logged in");
  const nav = useNavigate();
  function CheckSession() {
    axios
      .get("http://localhost:8080/private/auth/session", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.authorization) {
          Cookies.set(
            "authorization",
            JSON.stringify(response.data.authorization),
          );
        }
      });
  }

  function LoginUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    axios
      .post(
        `http://${host}:8080/private/login`,
        {
          username: username,
          password: password,
        },
        { withCredentials: true },
      )
      .then((response) => {
        setLoggedUser(`Successfully logged in ${response.data.user}`);
        nav("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const sessionAuth = Cookies.get("authorization");

  if (false) {
    return <h2> {sessionAuth.username} Already Logged In </h2>;
  } else {
    return (
      <div id="login" class="Login">
        <div class="mx-10 my-2 ">
          <small id="loggedInUserHelp" class="form-text text-muted">
            {loggedUser}
          </small>
          <form onSubmit={LoginUser}>
            <div class="form-group">
              <label for="inputUsername">Username</label>
              <input
                type="text"
                class="form-control"
                id="inputUsername"
                aria-describedby="emailHelp"
                placeholder="Username"
                name="username"
              />
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="Password"
                name="password"
              />
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
