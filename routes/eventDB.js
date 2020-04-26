const mongoose = require("mongoose");
const userSchema = require("./userDB");
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  location: String,
  bookedBy: [userSchema],
  isValid: Boolean,
  rating: String,
  price: Number,
  discount: {
    type: Number,
    required: function () {
      return this.isValid;
    },
  },
});

const Event = mongoose.model("events", eventSchema);

//
async function createEventInDB(req) {
  return new Promise((result, reject) => {
    result(
      new Event({
        name: req.name,
        location: req.location,
        price: req.price,
      }).save()
    );
    reject(new Error("already there, did you mean to update?"));
  });
}

async function getEventsFromDB() {
  return new Promise((result, reject) => {
    result(Event.find({}));
    reject(new Error("Error no events found"));
  });
}

async function getEventFromDB(id) {
  const event = await Event.findById(id);
  return new Promise((result, reject) => {
    if (event) result(event);
    else reject(new Error("no event with id " + id + " found"));
  });
}
async function deleteFromDB(id) {
  return new Promise((result, reject) => {
    let oldEvent = Event.findById(id);
    if (!oldEvent)
      reject(new Error("Error deleting event with id " + id + " in DB"));
    else result(Event.findByIdAndRemove(id));
  });
}
async function updateInDB(req, id) {
  return new Promise((result, reject) => {
    if (!Event.findById(id))
      reject(new Error("Error updating event with id " + id + " in DB"));
    else
      result(
        Event.findByIdAndUpdate(
          id,
          {
            $set: {
              name: req.name,
            },
          },
          { new: true }
        )
      );
  });
}

module.exports = {
  getEventFromDB,
  getEventsFromDB,
  deleteFromDB,
  updateInDB,
  createEventInDB,
  eventSchema,
};
