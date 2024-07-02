const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
    title :{
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=",
    
        set: (v)=> v ===""? "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=" :v,
    },
    price: Number,
    location: String,
    country: String
})

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;