const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  read: Boolean,
  write: Boolean,
  passwordHash: String,
  inventory: Array,
  price: Number,
  events: new mongoose.Schema({
    name: String,
    location: String,
  }),
  isAdmin: Boolean,
  discount: {
    type: Number,
    required: function () {
      return this.premiumUser;
    },
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("webTokenSalt")
  );
  return token;
};
const User = mongoose.model("users", userSchema);

async function createUserInDB(req) {
  const userName = await User.find({ name: req.name });
  const userMail = await User.find({ email: req.email });
  const salt = await bcrypt.genSalt(config.get("salt"));
  const passwordHash = await bcrypt.hash(req.password, salt);

  return new Promise((result, reject) => {
    if (!userName[0] && !userMail[0])
      result(
        new User({
          name: req.name,
          passwordHash: passwordHash,
          email: req.email,
        }).save()
      );
    else reject(new Error("Already there, did you mean to update?"));
  });
}

async function getUsersFromDB() {
  const users = await User.find({});
  return new Promise((result, reject) => {
    if (users.length > 0) result(users);
    else reject(new Error("either empty or db offline"));
  });
}

async function getUserFromDB(id) {
  const users = await User.findById(id);
  return new Promise((result, reject) => {
    if (!users) reject(new Error("Error deleting document in DB"));
    else result(users);
  });
}

async function deleteFromDB(id) {
  let oldUser = await User.findById(id);
  return new Promise((result, reject) => {
    if (!oldUser) reject(new Error("error deleting document in DB"));
    else result(User.findByIdAndRemove(id));
  });
}

async function updateInDB(req, id) {
  const user = await User.findById(id);
  const validPassword = await bcrypt.compare(req.password, user.passwordHash);
  const salt = await bcrypt.genSalt(config.get("salt"));
  const passwordHash = await bcrypt.hash(req.password, salt);
  return new Promise((result, reject) => {
    if (!validPassword) reject(new Error("Error updating document in DB"));
    else
      result(
        User.findByIdAndUpdate(
          id,
          {
            $set: {
              name: req.name,
              passwordHash: passwordHash,
              email: req.email,
            },
          },
          { new: true }
        )
      );
  });
}

module.exports = {
  getUserFromDB,
  getUsersFromDB,
  deleteFromDB,
  updateInDB,
  createUserInDB,
};
