const {
  createStory,
  getStory,
  getStories,
  updateStory,
  deleteStory,
} = require("./storyDB");

const express = require("express");
const app = express.Router();
app.use(express.json());

app.get("/:id", (req, res) => {
  getStory(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/", (req, res) => {
  getStories()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.post("/", (req, res) => {
  createStory(req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.put("/:id", (req, res) => {
  updateStory(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/:id", (req, res) => {
  deleteStory(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = app;
