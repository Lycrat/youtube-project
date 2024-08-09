function VideoCard(props) {
  let video = props.video;
  if (!video.snippet.description) {
    video.snippet.description = "No description";
  }
  return (
    <div
      class="col-3 overflow-hidden text-center my-2"
      style={{ height: "400px" }}
    >
      <div class="card h-100">
        <div>
          <img
            class="card-img"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">{video.snippet.title}</h5>
          <hr class="hr" />
          <div class="overflow-scroll h-30">
            <p class="card-text overflow-scroll">{video.snippet.description}</p>
          </div>
        </div>
        <a
          href="#"
          class="btn btn-primary stretched-link"
          style={{ background: "transparent", border: "none" }}
        ></a>
      </div>
    </div>
  );
}

export default VideoCard;
