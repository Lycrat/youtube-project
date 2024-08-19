function VideoCard(props) {
  let video = props.video;
  if (!video.snippet.description) {
    video.snippet.description = "No description";
  }
  return (
    <div
      class="col-lg-3 col-md-4 col-sm-6 overflow-hidden text-center my-2"
      style={{ height: "400px" }}
    >
      <div class="card h-100">
        <div>
          <img
            class="card-img-top"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{video.snippet.title}</h5>
          <hr class="hr" />
          <div class="overflow-auto flex-grow-1" style={{ maxHeight: "100px" }}>
            <p class="card-text">{video.snippet.description}</p>
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
