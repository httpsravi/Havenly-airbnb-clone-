const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methoOverride = require("method-override");
const ejsMate = require("ejs-mate");

const mongo_url = "mongodb://127.0.0.1:27017/havenly";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

app.set("view engine" , "ejs");
app.set("path" , path.join(__dirname , "views")); 
app.use(express.urlencoded({extended:true}));  
app.use(express.json());
app.use(methoOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.get("/" , (req , res) => {
    res.send("working");                
});

//INDEX ROUTE
app.get("/listings" , async (req , res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
});

//NEW ROUTE
app.get("/listings/new" , (req , res)=>{
    res.render("listings/new");
});

//SHOW ROUTE
app.get("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show" , {listing});
});

//CREATE ROUTE
app.post("/listings" , async(req , res)=>{
    // let {title , description , image , price , country , location} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
});

//EDIT ROUTE 
app.get("/listings/:id/edit" , async (req , res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
});

//UPDATE ROUTE
app.put("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//DELETE ROUTE
app.delete("/listings/:id" , async (req , res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
});

// app.get("/testlisting" , async (req , res)=>{
//     let samplelisting = new Listing ({
//         title:"my new villa",
//         description: "by the beach",
//         price: 1200,
//         location: "calunguate , Goa",
//         country:"India"
//     });
    
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("saved succesfully");
// });

app.listen(8080 , ()=>{
    console.log("app is listening to server 8080");
});
