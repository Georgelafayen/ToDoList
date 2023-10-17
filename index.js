import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

db().catch((err) => console.log(err));

async function db() {
  await mongoose.connect("mongodb+srv://admin-giorgio:Test123@todoapp.fwgsuxt.mongodb.net/toDoListDB");
  //await mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB");
  console.log("DB connected!");
}

const taskSchema = new mongoose.Schema({
  task: String,
});

const Today = mongoose.model("Today", taskSchema);
let today;

const Work = mongoose.model("Work", taskSchema);
let work;



// Today routes: GET - POST
app.get("/", async (req, res) => {
  today = await Today.find();
  res.render("index.ejs", {today});
});

app.post("/submitTask", (req, res) => {
  const todayTask = new Today({
    task: req.body.todayTask,
  });
  todayTask.save();
  console.log(todayTask);
  res.redirect("/");
});

// Work routes: GET - POST
app.get("/work", async (req, res) => {
  work = await Work.find();
  res.render("work.ejs", {work});
});

app.post("/submitWorkTask", (req, res) => {
  const workTask = new Work({
    task: req.body.workTask
  });
  workTask.save();
  console.log(workTask);
  res.redirect("/work");
});

//Delete Routes
app.post("/deleteToday", async (req, res) => {
  const checkedTask = req.body.checkbox;

  await Today.findByIdAndDelete(checkedTask)
  console.log("You have deleted " + checkedTask + " from DB.");
  res.redirect("/");
});

app.post("/deleteWork", async (req, res) => {
  const checkedTask = req.body.checkbox;
  await Work.findByIdAndDelete(checkedTask);
  console.log("You have deleted " + checkedTask + " from DB.");
  res.redirect("/work");
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
