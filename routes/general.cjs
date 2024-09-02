const fs = require("fs");
const express = require("express");
const axios = require("axios");
const conn = require("../database.cjs");
const path = require("path");
const { videoConn } = require("../database.cjs");
const { streamVideo } = require("../utils/streamUtils.cjs");
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
// Get all community videos
public_users.get("/community/videos", async (req, res) => {
  const query = `SELECT videoJson from videos`;
  videoConn.query(query, (err, rows) => {
    if (err) {
      return console.log(err);
    }
    res.json(rows);
  });
});
// Stream a video
public_users.get("/video/:id", async function (req, res) {
  const videoName = req.params.id;
  let cleanVidName = videoName.toLowerCase().trim();
  const reg = new RegExp(cleanVidName, "i");
  let matchedVidName = "";
  let matchedDir = "videos";
  const files = fs.readdirSync(path.join(__dirname, "..", "videos"));
  files.forEach((file) => {
    if (reg.test(file)) {
      matchedVidName = file;
    }
  });

  if (matchedVidName === "") {
    const files = fs.readdirSync(path.join(__dirname, "..", "community"));
    files.forEach((file) => {
      if (reg.test(file)) {
        matchedVidName = file;
        matchedDir = "community";
      }
    });
  }

  const videoPath = path.join(__dirname, "..", matchedDir, `${matchedVidName}`);
  streamVideo(videoPath, req, res);
});
// Get all vagrant videos
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

public_users.post("/register", function (req, res) {
  const username = req.query.username;
  const password = req.query.password;
  // Check if we received username and password
  if (!username || !password) {
    return res.status(400).send("No username or password provided");
  }

  // Check if the username already exists
  conn.query(
    `SELECT username FROM users
    WHERE username == ${username}`,
    function (err, res, fields) {
      // There is no user
      if (err) {
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        const values = [username, password];
        conn.query(sql, values, function (err, res) {
          if (err) throw err;
          return res.status(200).send("Added new user");
        });
      }
      console.log(res);
    },
  );
});

module.exports = public_users;
