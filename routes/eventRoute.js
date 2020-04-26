const {
  getEventFromDB,
  getEventsFromDB,
  deleteFromDB,
  updateInDB,
  createEventInDB,
} = require("./eventDB");
const express = require("express");
const app = express.Router();
const dev = require("debug")("development");
app.use(express.json());

app.get("/:id", (req, res) => {
  getEventFromDB(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err.message));
});

app.get("/", (req, res) => {
  getEventsFromDB()
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err.message));
});

app.post("/", (req, res) => {
  createEventInDB(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err.message));
});

app.put("/:id", (req, res) => {
  updateInDB(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err.message));
});

app.delete("/:id", (req, res) => {
  deleteFromDB(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err.message));
});

module.exports = app;
