
//***********************  All STORIES   ****************************/
function showAllStories() {
    $("#demo").empty();
    $("#demo").addClass("class='container-fluid'");
    let storyArray = [];
  
  
    $.get("/api/stories", function (data) {
      storyArray = data;
  
      for (let i = 0; i < storyArray.length; i++) {
  
  
        $("#demo").append(
          `<p>Title: ${storyArray[i].title} <br>Likes: ${storyArray[i].likes} 
           <br> ${storyArray[i].text} </p> <button  onclick='javascript:likeStory("${storyArray[i]._id}")'>Like story</button>`
        );
      }
  
  
    })
  }

  //***********************    Funktion um eine story zu liken. Es wird geprüft ob die story schonmal von diesem Benutzer geliked wurde    ****************************/
  function likeStory(id) {
    $.ajax({
      beforeSend: function (xhr) {
  
        xhr.setRequestHeader("x-token", usertoken)
      },
      type: "PUT",
      url: `/api/stories/${id}`,
      data: { liked: [currentUser], likes: 1 },
      success: function () {
        showAllStories();
        alert("story liked")
      },
      error: function (error) {
        alert(error.responseText)
      },
  
    })
  }
  //***********************    Funktion um die selbstverfassten stories zu den gebuchten events anzuzeigen    ****************************/
  function showMyStories() {


    $("#demo").empty();
    $("#demo").append("<div class='container-fluid' style='border:5px solid #555;' id='myStories'></div>");
    $('#myStories').append("<h1> My Stories </h1>");
    $.ajax({
  
      type: "GET",
      url: `/api/stories`,
      success: function (data) {
        let stories = data;
        for (let i = 0; i < stories.length; i++) {
          if (stories[i].author == currentUser) {
  
            $("#myStories").append(
              `<p>Title: ${stories[i].title} <br>Likes: ${stories[i].likes} 
             <br> ${stories[i].text}</p> <button  onclick='javascript:editStory("${stories[i]._id}","${i}")'>Edit Story</button>
             <textarea  id='${i}' rows="4" cols="50"></textarea>
             `
            );
          }
        }
  
      },
      error: function (error) {
        alert(error.responseText);
      }
    })
  
  
  }
  //***********************   Funktion um eine eigene Story zu editieren   ****************************/
  function editStory(id, i) {
    let newText = $("#" + i).val();
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
  
      },
      type: "PUT",
      url: `/api/stories/${id}`,
      data: { text: newText },
      success: function (data) {
        showMyStories();
  
        alert("text successfully edited");
      },
      error: function (error) {
        alert(error.responseText);
      }
    })
  
  
  }
  