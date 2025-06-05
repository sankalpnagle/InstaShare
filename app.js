const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;

// Configure CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "your-production-domain.com"
        : "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose.set("strictQuery", true);
mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("error during connection", err);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/users", require("./routes/user"));
// const customMiddleware = (req,res,next)=>{
//     console.log("midleware executed");
//     next()
//     //midleware takes three arugument it takes incoming request and modifies it before it reach to the route handler
//     // next() is used for the loading of a page
//     // midleware is excuting first then route handler process
// }

// app.use(customMiddleware) // we use app.use for implement middleware to all get request

// app.get('/',(req,res)=>{
//     console.log("home page");
//     res.send("hellow")
// }
// )
// app.get('/about',customMiddleware,(req,res)=>{ // if we want to implement middleware for specific route handler
//     console.log("about page");
//     res.send("about page")
// })

// if (process.env.NODE_ENV=="production") {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(PORT, () => {
  console.log("connected", PORT);
});
