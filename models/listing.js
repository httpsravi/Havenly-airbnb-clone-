const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

let listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://unsplash.com/photos/single-tree-in-a-field-with-light-rays-nvERYppV3SM",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/single-tree-in-a-field-with-light-rays-nvERYppV3SM"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review",
  }],
});

listingSchema.post("findOneAndDelete" , async(listing)=>{
  if(listing){
      await Review.deleteMany({_id : {$in : listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
