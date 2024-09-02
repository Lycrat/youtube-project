import { useNavigate } from "react-router-dom";

function VideoCard(props) {
  let video = props.video;
  let isCommunity = props.isCommunity;
  // console.log(video.snippet.thumbnails.medium.url);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/video", { state: { video: video } });
  }

  if (!video.snippet.description) {
    video.snippet.description = "No description";
  }
  return (
    <div
      class="col-lg-3 col-md-4 col-sm-6 overflow-hidden text-center my-2"
      style={{ height: "400px" }}
    >
      <div class="card card-hover h-100">
        <div>
          <img
            class="card-img-top"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            style={{ maxHeight: "165px" }}
          />
        </div>
        <div class="card-body d-flex flex-column positioning-relative">
          <h5
            class="card-title"
            style={{ minHeight: "50px", maxHeight: "50px" }}
          >
            {video.snippet.title}
          </h5>
          <hr class="hr" />
          <div class="overflow-auto" style={{ maxHeight: "100px" }}>
            <p class="card-text">{video.snippet.description}</p>
          </div>
        </div>
        <a
          onClick={handleClick}
          class="btn btn-primary stretched-link"
          style={{ background: "transparent", border: "none" }}
        ></a>
      </div>
    </div>
  );
}

export default VideoCard;
