const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/register", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/me", require("./routes/home"));
app.use("/token", require("./routes/token"));
app.use("/refresh", require("./routes/refresh"));
app.use("/playlists", require("./routes/playlists"));
app.use("/likedSongs", require("./routes/liked"));
app.use("/download", require("./routes/download"));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    family: 4,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
