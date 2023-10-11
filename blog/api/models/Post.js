const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    category : {
      type : String,
      required : true
    },
    date : {
      type : String,
      required : true
    },
    likes : {
      type : Number,
      required : true
    },
    comments : {
      type : Number,
      required : true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
