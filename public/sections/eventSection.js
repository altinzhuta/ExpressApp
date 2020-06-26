let eventArray;

  //***********************   Zeigt alle events im shop an   ****************************/

function showAllEvents() {
 
  $("#demo").empty();
  $("#demo").addClass("class='container' style='width: 100%; margin: 0 auto; text-align: left'");
  $('#demo').append("<h2>Event Catalouge </h2>");
  $('#demo').append("<div class='container'></div>")
  $('#demo').append("<div class='row' id='eventRows' style='width: 100%; margin: 0 auto; text-align: left'></div>");
  $("#eventRows").append('<div class="col-sm-6" id="imageHolder"></div>');
  $("#eventRows").append('<div class="col-sm-6" id="spotEvent"></div>')

  $.ajax({
    beforeSend: function () { },
    type: "GET",
    url: "/api/events",
    success: function (data) {
     eventArray = data;

      for (let i = 0; i < eventArray.length; i++) {

        $("#imageHolder").append(`<div  id="eventCatalougeDiv"> <h1 > ${eventArray[i].name}</h1><a href="javascript:changeSpotEvent('${eventArray[i]._id}')"><img src="/images/${eventArray[i].name}.jpg" style="width:300px;height:300px"></a> <p> ${eventArray[i].location}<br>${eventArray[i].price} €<br>Rating: ${eventArray[i].rating}</p> </div>`);
      }

    },
    error: function (error) {
      alert(error.responseText);
    }
  });
}
//***********************   Funktion um das angeklicke event hervorzuheben und weitere details anzuzeigen   ****************************/
function changeSpotEvent(id) {
  let stories = [];
  let author = "";
  let event = null;
  for(let i=0; i<eventArray.length;i++){
    if(eventArray[i]._id==id){
      event=eventArray[i];
      stories=eventArray[i].stories;
    }
  }
      $('#spotEvent').empty();
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      $('#spotEvent').addClass('class="col-sm-6"');

      $('#spotEvent').append(`<div> <img src="./images/${event.name}.jpg" style="width:400px;height:400px"> </div>`);
      $('#spotEvent').append(`<h1>${event.name}</h1> <p> ${event.location}</p> <p>${event.price} €</p> <p>Rating: ${event.rating}</p><p>Date: ${event.date}</p><p>Times booked: ${event.timesBooked} `);
      $('#spotEvent').append(`<button class='btn-primary' onClick='javascript:bookEvent("${event._id}")' style='width:200px;'  >book event </button>`);

    
  $.ajax({
    type: "GET",
    url: "/api/stories",
    success: function (data) {
      let storyArray = data;

      for (let i = 0; i < storyArray.length; i++) {
        for (let j = 0; j < stories.length; j++) {

          if (storyArray[i]._id == stories[j]) {
            author = storyArray[i].author
            $('#spotEvent').append(`<p>${storyArray[i].text} </p>`)
          }


        }
      }
      $.get(`/api/users/${author}`, function (data) {
        if (data.name) {
          $('#spotEvent').append(`<p>Story from ${data.name} </p>`);
        } else {
          $('#spotEvent').append(`<p> No stories yet...</p>`);
        }

      });
    }
  })


}
//***********************  Funktion um ein event zu buchen und den damit eine storie über das event schreiben zu können   ****************************/
function bookEvent(eventId) {
  if (confirm("do you want to book the event?")) {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "PUT",
      url: `/api/users/${currentUser}`,
      data: {
        events: [eventId],
      },
      success: function (data) {
        increaseBookingTimes(eventId)
        alert("event booked!");
      },
      error: function (error) {
        alert(error.responseText);
      },
    })
  } else {
    alert("booking canceled")
  }
}
//***********************   Funktion um bei einer buchung die anzahl der Buchungen für das event zu erhöhen  ****************************/
function increaseBookingTimes(id){
  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-token", usertoken);
    },
    type: "PUT",
    url: `/api/events/${id}`,
    data:
      { timesBooked: 1 },
    success: function (data) {
      showAllEvents();

    },
    error: function (error) {
      alert(error.responseText);
    }

  })
}

//***********************    Die 3 events die in der Datenbank am am besten bewertet worden sind  ****************************/
function showBestOffers() {

  $("#demo").empty();
  $("#demo").addClass("container mt-3");
  $("#demo").append("<div class='carousel slide' data-ride='carousel' id='bestOffersCar'><h1>Most recommend events:</h1></div>");
  $('#bestOffersCar').append('<ul class="carousel-indicators"><li data-target="#bestOffersCar" data-slide-to="0" class="active"></li><li data-target="#bestOffersCar" data-slide-to="1"></li><li data-target="#bestOffersCar" data-slide-to="2"></li></ul>');

  $('#bestOffersCar').append("<div class='carousel-inner' id='carouselInner'> </div>");

  $('#carouselInner').append("<div class='carousel-item active' id='firstItem'> </div>");
  $("#firstItem").append(" <div class='carousel-caption' id='firstCaption'> </div>")

  $('#carouselInner').append("<div class='carousel-item' id='secItem'> </div>");
  $('#secItem').append(" <div class='carousel-caption' id='secCaption'> </div>")

  $('#carouselInner').append("<div class='carousel-item' id='thirdItem'> </div>");
  $('#thirdItem').append("<div class='carousel-caption' id='thirdCaption'> </div>")

  $('#bestOffersCar').append("<a class='carousel-control-prev' href='#bestOffersCar' data-slide='prev' id='prevSlide' > </a>");
  $('#prevSlide').append("<span class='carousel-control-prev-icon'></span>");
  $('#bestOffersCar').append("<a class='carousel-control-next' href='#bestOffersCar' data-slide='next' id='nextSlide' > </a>");
  $("#nextSlide").append("<span class='carousel-control-next-icon'></span>");



  $.ajax({
    beforeSend: function () { },
    type: "GET",
    url: "/api/events",
    success: function (data) {
      eventArray = data;

      eventArray.sort((a, b) => (a.rating - b.rating));


      $("#firstItem").append(`<a href="javascript:toSpotEventFromBestoffers('${eventArray[eventArray.length - 1]._id}')"> <img onclick="" src='./images/${eventArray[eventArray.length - 1].name}.jpg' alt='Event' >`)
      $("#firstCaption").append(`<h1> ${eventArray[eventArray.length - 1].name} </h1>`)
      $("#firstCaption").append(`<p> ${eventArray[eventArray.length - 1].location} </p>`)
      $("#firstCaption").append(`<p> ${eventArray[eventArray.length - 1].price} €</p>`)
      $("#firstCaption").append(`<p> Rating: ${eventArray[eventArray.length - 1].rating} </p>`)

      $("#secItem").append(`<a href="javascript:toSpotEventFromBestoffers('${eventArray[eventArray.length - 2]._id}')"><img src='./images/${eventArray[eventArray.length - 2].name}.jpg' alt='Event'  >`)
      $("#secCaption").append(`<h1> ${eventArray[eventArray.length - 2].name} </h1>`)
      $("#secCaption").append(`<p> ${eventArray[eventArray.length - 2].location} </p>`)
      $("#secCaption").append(`<p> ${eventArray[eventArray.length - 2].price} €</p>`)
      $("#secCaption").append(`<p> Rating: ${eventArray[eventArray.length - 2].rating} </p>`)

      $("#thirdItem").append(`<a href="javascript:toSpotEventFromBestoffers('${eventArray[eventArray.length - 3]._id}')"><img src='./images/${eventArray[eventArray.length - 3].name}.jpg' alt='Event' >`)
      $("#thirdCaption").append(`<h1> ${eventArray[eventArray.length - 3].name} </h1>`)
      $("#thirdCaption").append(`<p> ${eventArray[eventArray.length - 3].location} </p>`)
      $("#thirdCaption").append(`<p> ${eventArray[eventArray.length - 3].price} €</p>`)
      $("#thirdCaption").append(`<p>Rating: ${eventArray[eventArray.length - 3].rating} </p>`)
    },
  });
}
//***********************    Funktion die ein shortcut ist um aus dem best bewertesten darstellung zu der allgemeinen event darstellung zu gelangen    ****************************/
function toSpotEventFromBestoffers(id) {
  showAllEvents();
  console.log(id)
  changeSpotEvent(id)

}
//***********************    Funktion um die eigenen gebuchten events anzuzeigen     ****************************/
function showMyEvents() {
    $("#demo").empty();
    $("#demo").addClass("class='container-fluid'");
    let eventId = [];
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "GET",
      url: `/api/users/${currentUser}/profil`,
      success: function (data) {
  
        eventId = data.events;
  
      },
      error: function (error) {
  
        alert(error.responseText);
      },
  
    });
    $.get("/api/events", function (data) {
      eventArray = data;
      
      for (let i = 0; i < eventArray.length; i++) {
        for (let j = 0; j < eventId.length; j++) {
          if (eventArray[i]._id == eventId[j])
            $("#demo").append(
              `<p> ${eventArray[i].name} <br>
             Location:  ${ eventArray[i].location} <br>
             Date:  ${eventArray[i].date} <br>
                 Rating: ${eventArray[i].rating}<br>
                  
              </p><input type="text" id="${eventArray[i]._id}" placeholder="rate event"><button class='btn-primary' onClick='javascript:rateEvent("${eventArray[i]._id}")' style='width:200px;'  >rate event</button>
              <br><button class='btn-primary' onClick='javascript:writeStory("${eventArray[i]._id}","${i}")' style='width:200px;'  >write story</button><textarea  id='${i}' rows="4" cols="50"></textarea>`
            );
        }
      }
    })
  
  
  }
  //***********************    Funktion um eigene Events zu bewerten   ****************************/
  function rateEvent(id) {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "PUT",
      url: `/api/events/${id}`,
      data: { rating: $(`#${id}`).val() },
      success: function (data) {
        showMyEvents();
        alert("new rating: " + data.rating)
      },
      error: function (error) {
        alert(error.responseText);
      }
  
    })
  }
  //***********************    Funktion um eine story über ein gebuchtes event zu erstellen   ****************************/
  function writeStory(id, i) {
    let title = prompt("please enter title")
    let text=$("#" + i+"").val();
    console.log(text)
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
  
      },
      type: "POST",
      url: "/api/stories",
      data: { title: title, author: currentUser, text:text, event: id ,likes:0},
      success: function (data) {
        alert("story " + title + " created with text" + text)
      },
      error: function (error) {
        alert(error.responseText);
      }
    })
  }