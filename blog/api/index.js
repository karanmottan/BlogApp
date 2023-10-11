const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const corsOptions = {
  origin : '*',
  credentials : true,
  optionSuccessStatus : 200
}
dotenv.config();
app.use(express.json());
console.log(path.join(__dirname, "/images"));
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors(corsOptions));
mongoose
  .connect('mongodb+srv://karan:test1234@cluster0.khxpt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


const { resolve } = require("path");
// Replace if using a different env file or config







app.listen("5000", () => {
  console.log('here')
  console.log("Backend is running.");
});