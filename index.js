const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");
const examRoutes = require("./routes/examRoutes");
const sheetRoutes = require("./routes/sheetRoutes");
const boardRoutes = require("./routes/boardRoutes");
const videoRoutes = require("./routes/videoRoutes");
const bookRoutes = require("./routes/bookRoutes");
const port = process.env.PORT || 3001;

dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

require("events").EventEmitter.defaultMaxListeners = 15;

app.get("/", (req, res) => {
  res.send("nodejs");
});

app.use("/api/exams", examRoutes);
app.use("/api/sheets", sheetRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
