const {
  getEventFromDB,
  getEventsFromDB,
  deleteFromDB,
  updateInDB,
  createEventInDB,
} = require("../db/eventDB");

const express = require("express");
const app = express.Router();
const authentication= require("./authentication")
const adminCheck=require("./adminCheck")
app.use(express.json());

app.get("/:id", (req, res) => {
  getEventFromDB(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/", (req, res) => {
  getEventsFromDB()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.post("/", (req, res) => {
  createEventInDB(req.body)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.put("/:id", [authentication,adminCheck],(req, res) => {
  updateInDB(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/:id",[authentication,adminCheck] ,(req, res) => {
  deleteFromDB(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = app;
