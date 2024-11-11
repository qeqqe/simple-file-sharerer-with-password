const express = require("express");
const cors = require("cors");
const app = express();
const Modle = require("./Modle");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/file-sharer");

app.use(cors());
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});
app.use(express.json());

app.post("/auth", async (req, res) => {
  try {
    const { fileId, password } = req.body;
    const file = await Modle.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (file.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    res.json({
      filename: file.filename,
      file: file.file,
      mimetype: file.mimetype,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileData = {
      file: req.file.buffer,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      password: req.body.password,
    };

    const file = await Modle.create(fileData);
    res.json({ fileId: file._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
