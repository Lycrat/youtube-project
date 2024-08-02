const express = require("express");
const axios = require("axios");

const public_users = express.Router();

const api_key = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.VAGRANT_CHANNEL_ID;

var channel_endpoint = "https://www.googleapis.com/youtube/v3/channels";

let playlist_id = "";

async function getPlaylistItems(playlistId, pageToken) {
  const playlistItemsEndpoint =
    "https://www.googleapis.com/youtube/v3/playlistItems";
  let params = {
    key: api_key,
    part: "snippet",
    maxResults: 50,
    playlistId: playlistId,
    pageToken: pageToken,
  };

  try {
    const response = await axios.get(playlistItemsEndpoint, { params });
    return response.data;
  } catch (err) {
    throw new Error("Failed fetching playlist items");
  }
}

// Get all videos
public_users.get("/videos", async function (req, res) {
  if (!playlist_id) {
    params = {
      key: api_key,
      part: "contentDetails",
      id: CHANNEL_ID,
    };
    try {
      const response = await axios.get(channel_endpoint, { params });
      playlist_id =
        response.data.items[0].contentDetails.relatedPlaylists.uploads;
    } catch (err) {
      console.log(err);
      return res.send("Failed fetching videos");
    }
  }

  try {
    let videos = [];
    let pageToken = "";
    const data = await getPlaylistItems(playlist_id, pageToken);
    videos = data.items;
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching videos");
  }
});

module.exports = public_users;
