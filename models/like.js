const { timeStamp } = require('console');
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "onModel",
    },
    //this field is used for defining the type of the liked object since this is dynamic reference
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timeStamps: true
  }
);

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;