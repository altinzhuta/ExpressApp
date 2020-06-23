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
  passwordHash: String,
  inventory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"products"
  }],
  price: Number,
  friends:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  }],
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"events"
  }],
  isAdmin: {
  type: Boolean,
  default:false
  },
  premiumUser:Boolean
  
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
    else reject(new Error("no Users"));
  });
}

async function getUserFromDB(id) {
  const users = await User.findById(id);
  return new Promise((result, reject) => {
    if (!users) reject(new Error("user not found"));
    else result(users);
  });
}

async function deleteFromDB(id) {
  const oldUser = await User.findById(id);
  return new Promise((result, reject) => {
    if (!oldUser) reject(new Error("error deleting document in DB"));
    else result(User.findByIdAndRemove(id));
  });
}

async function updateInDB(req, id) {
  const user = await User.findById(id);
  const keys= Object.keys(req);

  return new Promise((result, reject) => {
    if (!user) reject(new Error("Error updating document in DB"));
    else
    for( const key of keys ){
      if(key!=null){
        user.key=req.key;
      }
    }
      result(user.save())
      
  });
}

module.exports = {
  getUserFromDB,
  getUsersFromDB,
  deleteFromDB,
  updateInDB,
  createUserInDB,
  userSchema
};
