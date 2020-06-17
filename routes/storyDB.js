const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  author: new mongoose.Schema({
    name: String,
    email: String,
  }),
  liked: new mongoose.Schema({
    name: String,
    email: String,
  }),
  event: new mongoose.Schema({
    name: String,
    location: String,
  }),
  likes: Number,
});

const Story = mongoose.model("users", storySchema);

async function createStory() {}
async function getStory() {}
async function getStories() {}
async function updateStory() {}
async function deleteStory() {}

module.exports = {
  createStory,
  getStory,
  getStories,
  updateStory,
  deleteStory,
};
