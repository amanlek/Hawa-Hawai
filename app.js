const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main().then(()=>{                                   //Basic connection code
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Wander') 
}
//till here

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req, res)=>{
   res.send(`hello`);
})


//index Route
app.get("/listings",async (req,res)=>{
    
    const allListings= await listing.find({});
    res.render("listings/index", {allListings});   //allListings is passed to index.ejs
})

//New route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
   const showListing = await listing.findById(id);
   res.render("listings/show",{showListing});
})

//create route
app.post("/listings",async (req,res)=>{
    
    
    const newListing = new listing(req.body.newlisting)
    await newListing.save();
    res.redirect("/listings")
})

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const editListing = await listing.findById(id);
    res.render("listings/edit.ejs", {editListing})
})

//update route
app.put("/listings/:id",async (req,res)=>{{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.newlisting})
    res.redirect(`/listings/${id}`);
}})

app.delete("/listings/:id",async (req,res)=>{{
    let {id} = req.params;
    let delListing = await listing.findByIdAndDelete(id)
    console.log("Deleted listing:")
    console.log(delListing)
    res.redirect(`/listings`);
}})



// app.get("/testlisting",async (req,res)=>{
//     let sampleListing=  new listing({
//         title: 'Chetan Hotel',
//         description: 'this is a hotel',
//         price: 799,
//         location: 'rajura',
//         country: 'India',
        
        
//     })
//     await sampleListing.save();
//     console.log("sample was saved")
//     res.send("aman")
// })

app.listen(8080, ()=>{
    console.log("server is listening tp port 8080");
})

