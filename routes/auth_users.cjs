const express = require("express");
const path = require("path");
const os = require("os");
const { conn, videoConn } = require("../database.cjs");
const jwt = require("jsonwebtoken");
const auth_users = express.Router();
const multer = require("multer");

// Setting multer file handling middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, "community");
    } else if (file.fieldname === "thumbnail") {
      cb(null, "thumbnails");
    }
  },
  filename: (req, file, cb) => {
    cb(null, req.body.videoName.trim() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  if (file.fieldname === "video") {
    const filetypes = /mp4|mov/;
    const mimetypes = ["video/mp4", "video/quicktime"];
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = mimetypes.includes(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: mp4 files only");
    }
  } else if (file.fieldname === "thumbnail") {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: images only");
    }
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

auth_users.get("/auth/comment", function (req, res) {
  res.send("not yet implemented");
});

auth_users.get("/auth/session", function (req, res) {
  if (req.signedCookies.authorization) {
    res.status(200).send(JSON.stringify(req.signedCookies.authorization));
  } else {
    res.status(401).send("No Session");
  }
});

function GetLastId() {
  nextId = 1;
  videoConn.query(
    `SELECT MAX(videoId) as lastId FROM videos`,
    (err, res, fields) => {
      if (err) {
        return console.log(err);
      }
      const id = res[0].lastId ? res[0].lastId + 1 : 1;
      console.log(res[0].lastId);
      nextId = id;
    },
  );
  return nextId;
}

auth_users.post("/auth/upload", upload, async (req, res) => {
  // If user is authorized
  if (req.signedCookies.authorization) {
    let ip;
    const interfaces = os.networkInterfaces()["en0"];
    for (const iface of interfaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        ip = iface.address;
      }
    }
    const date = new Date();
    const videoName = req.body.videoName;
    const videoDesc = req.body.videoDescription;
    const videoFile = req.files["video"];
    const thumbnailFile = req.files["thumbnail"];
    const uploadDate = date.toISOString().split("T")[0];
    const uploader = JSON.parse(req.signedCookies.authorization).username;

    const videoPath = path.join(__dirname, "..", "community", videoName);
    // const thumbnailPath = path.join(__dirname, "..", "thumbnails", videoName);

    const vidJson = {
      snippet: {
        title: videoName,
        description: videoDesc,
        vidPath: videoPath,
        thumbnails: {
          medium: {
            url: `http://${ip}:8080/thumbnails/${thumbnailFile[0].filename}`,
          },
          maxres: {
            url: `http://${ip}:8080/thumbnails/${thumbnailFile[0].filename}`,
          },
        },
        vidUploader: uploader,
        date: uploadDate,
      },
    };

    if (!videoFile || !thumbnailFile) {
      return res
        .status(400)
        .send({ message: "Both video and thumbnail are required!" });
    }

    const insertQuery = `INSERT INTO videos (videoJSON) VALUES (?)`;
    const insertValues = [JSON.stringify(vidJson)];
    videoConn.query(insertQuery, insertValues, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.send({
      message: "video and thumbnail uploaded",
      data: {
        videoName: videoName,
        videoDesc: videoDesc,
        videoFile: videoPath,
        thumbnail: thumbnailFile.filname,
        uploader: uploader,
        uploadDate: uploadDate,
      },
    });
  } else {
    console.log("not logged");
  }
});
auth_users.get("/auth/logout", function (req, res) {
  res.cookie("authorization", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).send();
});

auth_users.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.send("Username or password not provided.");
  }
  const sql = "SELECT password FROM users WHERE username = ? AND password = ?";
  const val = [username, password];

  conn.query(sql, val, function (err, result, fields) {
    if (result.length > 0) {
      const accessToken = jwt.sign(
        {
          username: username,
        },
        process.env.JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 },
      );
      req.session.authorization = { accessToken, username };
      return res
        .cookie("authorization", JSON.stringify(req.session.authorization), {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          signed: true,
        })
        .json({ user: username });
    } else {
      return res.send("No user in database.");
    }
  });
});

module.exports = auth_users;
