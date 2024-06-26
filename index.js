const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb://0.0.0.0:27017";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
client.connect()
  .then(() => {
    db = client.db("wnjune24");
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error("Failed to connect to MongoDB", err));

app.post("/save", async (req, res) => {
  try {
    const coll = db.collection("student");
    const record = { name: req.body.name, choice: req.body.choice };
    const result = await coll.insertOne(record);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(9000, () => {
  console.log("server ready @9000");
});
