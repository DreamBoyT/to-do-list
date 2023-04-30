const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
const items = [];
const workItems = [];
let day = "" ;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  day = date.getDate();
  res.render("list", { listTitle: day, listData: items });
});

app.post("/", function(req, res) {
  const item = req.body.listinput;
  if (req.body.buttonInput === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", listData: workItems });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening at port 3000");
});
