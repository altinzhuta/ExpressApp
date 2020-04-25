const { getUserFromDB, getUsersFromDB, deleteFromDB, updateInDB, createUserInDB } = require('./userDB')
const express = require('express');
const app = express.Router();
const dev = require("debug")("development");
app.use(express.json())

app.get('/:id', (req, res) => {
    getUserFromDB(req.params.id).then(result => res.send(result)).catch(err => res.status(404).send(err.message));
});

app.get('/', (req, res) => {
    getUsersFromDB().then(result => res.send(result)).catch(err => res.status(404).send(err.message))
});

app.post('/:id',  (req, res) => {
    createUserInDB(req.body ,req.params.id).then(result => res.send(result)).catch(err => res.status(500).send(err.message))
})

app.put('/:id', (req, res) => {
    updateInDB(req.body ,req.params.id).then(result => res.send(result)).catch(err => res.status(500).send(err.message))
})

app.delete('/:id', (req, res) => {
    deleteFromDB(req.params.id).then(result => res.send(result)).catch(err => res.status(500).send(err.message))
})





module.exports = app;