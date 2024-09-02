import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "./Button";
import { useVideoContext } from "../contexts/VideoContext";
import { useNavigate } from "react-router-dom";
export default function Navbar({ onHeightChange, children }) {
  const handleOffset = onHeightChange;
  const [logDetails, setLogDetails] = useState(undefined);

  const navbarRef = useRef(null);
  const { setSearchQuery } = useVideoContext();
  const { searchQuery } = useVideoContext() || "";

  const nav = useNavigate();
  let host = window.location.hostname;
  useEffect(() => {
    axios
      .get(`http://${host}:8080/private/auth/session`, {
        withCredentials: true,
      })
      .then((response) => {
        setLogDetails(JSON.parse(response.data));
      })
      .catch((err) => {
        console.log(err);
      });

    const updateNavbarHeight = () => {
      const height = navbarRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`,
      );
    };

    updateNavbarHeight();

    window.addEventListener("resize", updateNavbarHeight);

    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    nav("/", { state: { searchQuery: e.target.elements.searchInput.value } });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleLogout = async () => {
    axios
      .get(`http://${host}:8080/private/auth/logout`, {
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem("authorization");
      })
      .catch((e) => {
        alert(e.toString());
      });
    window.location.reload();
  };

  function DisplayUser(props) {
    if (logDetails !== undefined) {
      let href = "#";
      return (
        <div class="ms-auto col-gap-3">
          <span class="p-2 g-col-6"> User: {logDetails.username} </span>
          <Button href={href} text="logout" onClick={handleLogout} />
        </div>
      );
    } else {
      let href = "login";
      return <Button href={href} text={href} />;
    }
  }
  return (
    <body>
      <nav
        ref={navbarRef}
        class="navbar navbar-expand-lg navbar-light px-3 fixed-top"
      >
        <a class="navbar-brand font-weight-bold" id="navLogo" href="/">
          Vagrant Holiday
        </a>
        <button
          class="navbar-toggler"
          type="button"
          onClick={handleOffset}
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="container">
            <div class="row justify-content-md-center">
              <div class="col-lg-6 col-md-12">
                <ul class="navbar-nav">
                  <li class="nav-item active"></li>
                  <li class="nav-item">
                    <a class="nav-link" href="/">
                      Vagrant Uploads
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="community">
                      Community Uploads
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="upload">
                      Upload
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-9">
                <form
                  class="ms-auto input-group rounded"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search Videos"
                    onChange={handleInputChange}
                    aria-label="Search"
                    name="searchInput"
                    value={searchQuery}
                  />
                  <button class="btn btn-dark group-addon" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div class="col-lg-3 col-md-3 mr-0 text-end">
                <DisplayUser />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </body>
  );
}
