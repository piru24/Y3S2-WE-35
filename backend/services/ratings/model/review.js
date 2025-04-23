const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

  product_id:{
    type:String,
    required:true
  },
  rate: {
    type: Number,
     required: true
  },
  reviews: {
    type: String,
    //required: true
  },
  /* productId: {
    type: String,
    required: true
  },
  sellerId:{
    type: String,
    required: true
  }*/
});

module.exports = mongoose.model("Reviews", reviewSchema);
