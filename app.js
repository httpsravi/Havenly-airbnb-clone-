const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methoOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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
app.set("views" , path.join(__dirname , "views")); 
app.use(express.urlencoded({extended:true}));  
app.use(express.json());
app.use(methoOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.get("/" , (req , res) => {
    res.send("working");                
});


app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);

app.use((req , res , next)=>{
    next(new expressError(404 , "page not found"));
});

app.use((err , req , res , next)=>{
    let {statusCode=500 , message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs" , {message});
    // res.status(statusCode).send(message);
});

app.listen(8080 , ()=>{
    console.log("app is listening to server 8080");
});
