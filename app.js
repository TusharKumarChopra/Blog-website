//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const Content = require('../models/content');
const methodOverride = require('method-override');
mongoose.set('strictQuery', true); 
const serverless = require('serverless-http');
const router = express.Router();
main();
async function main() {
  try {
    await mongoose.connect('mongodb+srv://tushar-admin:test123@cluster0.uist6g8.mongodb.net/blog');
    console.log('Connected to the mongo database successfully');
    
    // Continue with your application logic here
  } catch (err) {
    console.log("oh no mongo error")
    console.error('Error connecting to the database:', err);
  }
}
let posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride('_method'))

router.get("/", async function(req, res) {
  try {
    const contents = await Content.find({}).exec();
    res.render("home", { startingContent: homeStartingContent, newPosts: contents });
  } catch (err) {
    console.error("Error fetching content:", err);
    // Handle the error appropriately, e.g., send an error page or a response.
  }
});

router.get("/about", function(req, res) {
  res.render("about", {
    aboutStartingContent: aboutContent});
});
router.get("/contact", function(req, res) {
  res.render("contact", {
    contactStartingContent: contactContent});
});
router.get("/compose", function(req, res) {
  res.render("compose");
})

router.post("/compose", async function (req, res) {
  const newPost = new Content({
    title: req.body.postTitle,
    bodyContent: req.body.postBody
  });

  try {
    await newPost.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving the new post:", err);
    // Handle the error appropriately, e.g., send an error page or a response.
  }
});



router.get("/posts/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const newPost = await Content.findOne({ _id: id }).exec();

    if (newPost) {
      res.render("post", {
        titleContent: newPost.title,
        bodyOfTitle: newPost.bodyContent,
        id: id
      });
    } else {
      // Handle the case where no post with the given ID is found
      res.status(404).send("Post not found");
    }
  } catch (err) {
    console.error("Error fetching post:", err);
    // Handle the error appropriately, e.g., send an error page or a response.
  }
});


router.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  await Content.findByIdAndDelete(id);
  res.redirect("/");
})







module.exports.handler = serverless(app);



app.listen(3000, function() {
  console.log("Server started on port 3000");
});