const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  } ,
  liked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  }],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"events"    
  },
  likes: Number

});

const Story = mongoose.model("stories", storySchema);

async function createStory(req) {
  const storyName= await Story.find({
    title:req.title
  });
  return new Promise((result,reject)=>{
    if(!storyName[0])result(new Story({
        title:req.title,
        author:req.author,
        liked:req.liked,
        event:req.event,
        likes:req.likes

    }).save());
    else reject(new Error("error creating story"));
  })

}
async function getStory(id) {
  const story= await Story.findById(id);
  return new Promise((result,reject)=>{
    if(story)result(story);
    else reject(new Error("no story found"))
  })
}
async function getStories() {
  const stories= await Story.find({});
  return new Promise((result,reject)=>{
    if(stories.length>0) result(stories);
    else reject(new Error("no stories"));
  })
}
async function updateStory(req,id) {
  const story = await Story.findById(id);
  const keys= Object.keys(req);

  return new Promise((result, reject) => {
    if (!story) reject(new Error("Error updating document in DB"));
    else
    for( const key of keys ){
      if(key!=null){
        story.key=req.key;
        
      }
    }
      result(story.save())
      
  });
}
async function deleteStory(id) {
  const oldStory= await Story.findById(id);
  return new Promise((result,reject)=>{
    if(oldStory) result(Story.findByIdAndDelete(id));
    else reject(new Error("error deleting"))
  })
}

module.exports = {
  createStory,
  getStory,
  getStories,
  updateStory,
  deleteStory,
};
