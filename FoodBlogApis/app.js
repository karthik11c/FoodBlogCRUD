const express = require("express");
const RecipeRoutes = require("./routes/RecipeRoutes");

const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const app = express();

const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

app.use("/routes", express.static("routes"));

try {

 mongoose.connect(keys.mongodb.dbOrg, 
  {useNewUrlParser: true,useUnifiedTopology: true},
  async () => {
  console.log("connected to mongodb..");
});

}catch(e){
 console.log("connection terminated..."+e);
}

mongoose.connection.on('error', err => {
  console.error('error occured : ',err);
});
mongoose.set('bufferCommands', false);

app.use("/recipes", RecipeRoutes);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// create home route
app.get("/", (req, res) => res.json({"hello" : "fck"}));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("app now listening for requests on port 3001");
});
