const mongoose = require("mongoose");

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
  bookedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],
  stories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "stories"
  }],
  timesBooked:Number,
  rating: String,
  price: Number,


});

const Event = mongoose.model("events", eventSchema);

//
async function createEventInDB(req) {
  return new Promise((result, reject) => {
    result(
      new Event({
        name: req.name,
        date: req.date,
        location: req.location,
        bookedBy: req.bookedBy,
        stories: req.stories,
        timesBooked:req.timesBooked,
        rating: req.rating,
        price: req.price
      }).save()
    );
    reject(new Error("already there, did you mean to update?"));
  });
}

async function getEventsFromDB() {
  return new Promise((result, reject) => {
    result(Event.find({}));
    reject(new Error("Error no events"));
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
  
  let event = await Event.findById(id);
  let keys= Object.keys(req);

  return new Promise((result, reject) => {
    if (!event) reject(new Error("Error updating document in DB"));
    else
    for( const key of keys ){
      if(Array.isArray(event[key])&&key!=null){
        let combined= event[key].concat(req[key]);
        event[key]=combined;

      }else if(key=="bookedBy"){
        event.timesBooked++
      }
      else if(!Array.isArray(event[key])&&key!=null){
        event[key]=req[key];
      }
    }
      result(event.save())
      
  });
}

module.exports = {
  getEventFromDB,
  getEventsFromDB,
  deleteFromDB,
  updateInDB,
  createEventInDB,
  eventSchema
};
