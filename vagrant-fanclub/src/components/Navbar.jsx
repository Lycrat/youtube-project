import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import Button from "./Button";
import SearchBar from "./SearchBar";
export default function Navbar(props) {
  const handleSearch = props.onSearch;
  const handleOffset = props.onHeightChange;
  const [logDetails, setLogDetails] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/private/auth/session", {
        withCredentials: true,
      })
      .then((response) => {
        setLogDetails(JSON.parse(response.data));
      })
      .catch((err) => {});

    if (handleOffset) {
      const updateNavbarHeight = () => {
        if (navbarRef.current) {
          const height = navbarRef.current.offsetHeight;
          handleOffset(height);
        }
      };

      updateNavbarHeight();

      window.addEventListener("resize", updateNavbarHeight);

      return () => window.removeEventListener("resize", updateNavbarHeight);
    }
  }, [handleOffset]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  function DisplayUser(props) {
    if (logDetails !== undefined) {
      let href = "logout";
      return (
        <div class="ms-auto col-gap-3">
          <span class="p-2 g-col-6"> User: {logDetails.username} </span>
          <Button href={href} text={href} />
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
        class="navbar navbar-expand-lg navbar-light px-3 fixed-top border-bottom border-light"
      >
        <a class="navbar-brand font-weight-bold" id="navLogo" href="/">
          Vagrant Holiday Fanclub
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
                  <li class="nav-item active">
                    <a class="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="root">
                      Vagrant Uploads
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="community">
                      Community Uploads
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-9">
                <form class="ms-auto input-group border border-dark rounded">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search Videos"
                    onChange={handleInputChange}
                    value={searchQuery}
                    aria-label="Search"
                  />
                  <button class="btn btn-light group-addon" type="submit">
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
    </body>
  );
}
