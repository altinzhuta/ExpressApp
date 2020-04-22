const mongoose = require('mongoose')
const { eventSchema } = require('./eventDB')
const dev = require("debug")("development");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    date: {
        type: Date,
        default: Date.now
    },
    passwordHash: String,
    password: String,
    inventory: Array,
    price: Number,
    events: [eventSchema],
    premiumUser: Boolean,
    discount: {
        type: Number,
        required: function () { return this.premiumUser }
    }
})

const User = mongoose.model('users', userSchema);

async function createUserInDB(req, id) {
    const user = await User.findById(id);
    const salt = await bcrypt.genSalt(10);
    genPasswordHash = await bcrypt.hash(req.password, salt);
    return new Promise((result, reject) => {
        if (user.name != req.name)
            result(new User({ name: req.name, password: req.password, passwordHash: genPasswordHash }).save())
        else
            reject(new Error('Already there, did you mean to update?'))
    });
}

async function getUsersFromDB() {
    let users = await User.find({});
    return new Promise((result, reject) => {
        if (users.length > 0)
            result(users);
        else
            reject(new Error('either empty or db offline'))
    });
}

async function getUserFromDB(id) {
    const users = await User.findById(id);
    return new Promise((result, reject) => {
        if (!users)
            reject(new Error("Error deleting document in DB"))
        else
            result(users)
    });
}

async function deleteFromDB(id) {
    let oldUser = await User.findById(id)
    return new Promise((result, reject) => {
        if (!oldUser)
            reject(new Error("error deleting document in DB"))
        else
            result(User.findByIdAndRemove(id))
    })
}

async function updateInDB(req, id) {
    const salt = await bcrypt.genSalt(10);
    genPasswordHash = await bcrypt.hash(req.password, salt);
    return new Promise((result, reject) => {
        if (!User.findById(id))
            reject(new Error("Error updating document in DB"))
        else
            result(User.findByIdAndUpdate(id, {
                $set: {
                    name: req.name,
                    password: req.password,
                    passwordHash: genPasswordHash
                }
            }, { new: true }));
    });
}


module.exports = { getUserFromDB, getUsersFromDB, deleteFromDB, updateInDB, createUserInDB, userSchema };
