const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Wander')
}

const initDB = async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);               //initData is an object
    console.log("Data was initialized");
}
initDB();

