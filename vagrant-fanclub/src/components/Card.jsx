function VideoCard(props) {
  let video = props.video;
  return (
    <div class="col-4">
      <div class="card" style={{ width: "100%" }}>
        <img
          class="card-img-top"
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
        />
        <div class="card-body">
          <h5 class="card-title">{video.snippet.title}</h5>
          <p class="card-text">{video.snippet.description}</p>
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
