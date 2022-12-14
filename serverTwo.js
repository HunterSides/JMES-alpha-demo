const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const LOCAL_SERVER_PATH = "192.168.0.2";
const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.status(200).send("You can post to /api/upload.");
});

app.post("/api/upload", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  res.status(200).json({
    message: "success!",
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `server is running at http://${LOCAL_SERVER_PATH}:${
      process.env.PORT || 3001
    }`
  );
});
