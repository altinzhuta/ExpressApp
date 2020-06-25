let usertoken;
let currentUser;
let productID;
let userID;
let adminMethod;
$(document).ready(function () {
  showBestOffers();

  $("#sadminButton").hide("hide");

  $("#search").keypress(function () {
    $("a").remove(".searching");
    $.get(`/api/products/search/${$(this).val()}`, function (data) {
      for (let i = 0; i < data.length; i++) {
        $('#searchDropdown').append(`<a href="/api/products/${data[i]._id}"  class="searching">${data[i].name} <br> </a>`)
      }

    });

  })

  $("#login").click(function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: { email: $("#email").val(), password: $("#password").val() },
      success: function (data, textStatus, request) {
        usertoken = request.getResponseHeader("x-token");
        currentUser = data._id;
        if(data.isAdmin==true){
          $("#sadminButton").show();
        }
        alert("User log in successfull");
      },
      error: function (error) {
        alert(error.statusText);
      },
    });
  });

  $("#logout").click(function () {
    usertoken = null;
    currentUser = null;
    if (usertoken || currentUser == null) alert("log out successful!");
    else alert("logout failed");
  });
  $("#registerModal").on("hidden.bs.modal", function () {
    $(":input", this).val("");
  });
  $("#registerUser").click(function (event) {
    event.preventDefault;
    if ($("#reg_pwd").val() == $("#reg_pwd2").val()) {
      $.ajax({
        type: "POST",
        url: "/api/users",
        data: {
          email: $("#reg_email").val(),
          name: $("#reg_usr").val(),
          password: $("#reg_pwd").val(),
        },
        success: function (data, textStatus, request) {
          $("#registerModal").hide('hide');
          alert("User created successfully");
        },
        error: function (error) {
          alert(error.statusText);
        },
      });
    } else {
      alert("check password again");
    }
  });
  $("#updateProductModal").on("hidden.bs.modal", function () {
    $(":input", this).val("");
  });
  $("#updateProductM").click(function (event) {
    event.preventDefault;
      $.ajax({
        beforeSend:function(xhr){
            xhr.setRequestHeader("x-token",usertoken)
        },
        type: adminMethod,
        url: `/api/products/${productID}`,
        data: {
          name: $("#name_modal").val(),
          price: $("#price_modal").val(),
          rating: $("#rating_modal").val(),
          stock: $("#stock_modal").val()
        },
        success: function (data, textStatus, request) {
          $("#updateProductModal").hide('hide');
          alert("Product updated successfully");
        },
        error: function (error) {
         
          alert(error.statusText);
        },
      });
    
  });
  $("#updateUserModal").on("hidden.bs.modal", function () {
    $(":input", this).val("");
  });
  $("#updateUserM").click(function (event){
      event.preventDefault
    $.ajax({
      beforeSend:function(xhr){
          xhr.setRequestHeader("x-token",usertoken)
      },
      type: adminMethod,
      url: `/api/users/${userID}`,
      data: {
        name: $("#name_modalU").val(),
        email: $("#email_modalU").val(),
        passwordHash: $("#password_modalU").val(),
        date: $("#date_modalU").val()
      },
      success: function (data, textStatus, request) {
        $("#updateUserModal").hide('hide');
        alert("User updated successfully");
      },
      error: function (error) {
        
        alert(error.responseText);
      },
    });


  })


});


function editUser() {
  $("#demo").empty()
  $("#demo").addClass("class=container-fluid");
  $("#demo").append("<div class='container' id='demo2'</div>")
  $('#demo2').append("<div class='row' id='userColumn' ></div>");
  $.ajax({
    beforeSend: function () { },
    type: "GET",
    url: "/api/users",
    success: function (data) {
      let users = [];
      users = data;

      for (let i = 0; i < users.length; i++) {


        $("#userColumn").append(

          `<div class="column" style="padding:0 15px;"> 
          <p> ${users[i].name}</p>
           <p> ${users[i].email}</p> 
           <p> ${users[i].passwordHash}</p>
            <p> ${users[i].date}</p>
          <button class='btn-primary'   data-toggle="modal" data-target="#updateUserModal" onclick='javascript:setuser("${users[i]._id}","PUT")' style='width:200px;'> Update User
           </button> 
           <button class='btn-primary'   data-toggle="modal" data-target="#updateUserModal" onclick='javascript:setuser("${users[i]._id}","DELETE")' style='width:200px;'> Delete User
           </button> </div>`
        );
      }

    },
  });

}
function editProduct() {
  $("#demo").empty()
  $("#demo").addClass("class=container-fluid");
  $("#demo").append("<div class='container' id='demo2'</div>")
  $('#demo2').append("<div class='row' id='userColumn' ></div>");
 
  $.ajax({
    beforeSend: function () { },
    type: "GET",
    url: "/api/products/",
    success: function (data) {
      let products = [];
      products = data;

      let infos={};
      for (let i = 0; i < products.length; i++) {

        
        $("#userColumn").append(
          `<div class="column" style="padding:0 15px;"> 
          <p> ${products[i].name}</p>
           <p> ${products[i].stock}</p> 
           <p> ${products[i].rating}</p>
            <p> ${products[i].price}</p>
          <button class='btn-primary'   data-toggle="modal" data-target="#updateProductModal" onclick='javascript:setproduct("${products[i]._id}","PUT")' style='width:200px;'> Update Product
           </button>
           <button class='btn-primary'   data-toggle="modal" data-target="#updateProductModal" onclick='javascript:setproduct("${products[i]._id}","DELETE")' style='width:200px;'> Delete Product
           </button> </div>`
        );
         
          
      }
      
    },
  });

}
function setproduct(id,method){
productID=id;
adminMethod=method
}
function setuser(id,method){
  userID=id;
  adminMethod=method;
  }
function showMyStories() {
  $("#demo").empty();
  $("#demo").addClass("class='container-fluid'");
  $("#demo").append("<div class='media' id='story'></div>");
  $("#story").append("<div class='media-body' id='storyBody'></div>");
  $("#storyBody").append(`<p> ${usertoken} </p>`);
}
//***********************   EVENT CATALOUGE   ****************************/
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
      let eventArray = data;

      for (let i = 0; i < eventArray.length; i++) {

        $("#imageHolder").append(`<div  id="eventCatalougeDiv"> <h1 > ${eventArray[i].name}</h1><a href="javascript:changeSpotEvent('${eventArray[i]._id}')"><img src="/images/${eventArray[i].name}.jpg" style="width:300px;height:300px"></a> <p> ${eventArray[i].location}<br>${eventArray[i].price} €<br>Rating: ${eventArray[i].rating}</p> </div>`);
      }

    },
    error: function (error) {
      alert(error.responseText);
    }
  });
}
function changeSpotEvent(id) {
  let stories = [];
  let author = "";
  let event = null;
  $.ajax({
    type: "GET",
    url: `/api/events/${id}`,
    success: function (data) {
      event = data;
      stories = data.stories
      $('#spotEvent').empty();
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      $('#spotEvent').addClass('class="col-sm-6"');

      $('#spotEvent').append(`<div> <img src="./images/${event.name}.jpg" style="width:400px;height:400px"> </div>`);
      $('#spotEvent').append(`<h1>${event.name}</h1> <p> ${event.location}</p> <p>${event.price} €</p> <p>Rating: ${event.rating}</p><p>Date: ${event.date}</p> `);
      $('#spotEvent').append(`<button class='btn-primary' onClick='javascript:addBasket("${event._id}")' style='width:200px;'  >book event </button>`);

    },
    error: function (error) {
      alert(error.responseText)
    }
  })
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
function addBasket(eventId) {
  if (confirm("do you want to book the event?")) {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "PUT",
      url: `/api/events/${eventId}`,
      data: {
        bookedBy: [currentUser],
      },
      success: function (data) {
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
//***********************    My EVENTS    ****************************/
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
    let eventArray = data;
    for (let i = 0; i < eventArray.length; i++) {
      for (let j = 0; j < eventId.length; j++) {
        if (eventArray[i]._id == eventId[j])
          $("#demo").append(
            `<p> ${eventArray[i].name} <br>
            ${ eventArray[i].location} <br>
              ${eventArray[i].price} <br>
                ${eventArray[i].rating}
            </p>`
          );
      }
    }
  })


}
//***********************    My FRIENDS    ****************************/
function showMyFriends() {
  $("#demo").empty();
  $("#demo").append("<div class='container-fluid' style='border:5px solid #555;' id='friends'></div>")

  $('#friends').append("<h1> Mail friends and create your own stories together. </h1>");

  friendId = [];
  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-token", usertoken);
    },
    type: "GET",
    url: `/api/users/${currentUser}/profil`,
    success: function (data) {

      friendId = data.friends;

    },
    error: function (error) {

      alert(error.responseText);
    },

  });

  $.ajax({
    type: "GET",
    url: "/api/users",
    success: function (data) {
      userArray = data;

      for (let i = 0; i < userArray.length; i++) {
        for (let j = 0; j < friendId.length; j++) {
          if (userArray[i]._id == friendId[j]) {
            $("#friends").append(
              `<h2> ${userArray[i].name}</h2><p> ${userArray[i].email} </p><button class='btn-primary' onClick='javascript:writeEmail()' style='width:200px;'  >write email to ${userArray[i].name}</button>`
            );
          }
        }
      }
    },
    error: function (error) {

      alert(error.responseText);
    },
  });
}
function writeEmail() {
  alert("to do: MailService");
}

//***********************    BEST EVENT OFFERS (sort by RATING)   ****************************/
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
      let eventArray = [];
      eventArray = data;

      eventArray.sort((a, b) => (a.rating - b.rating));


      $("#firstItem").append(`<img src='./images/${eventArray[eventArray.length - 1].name}.jpg' alt='Event' >`)
      $("#firstCaption").append(`<h1> ${eventArray[eventArray.length - 1].name} </h1>`)
      $("#firstCaption").append(`<p> ${eventArray[eventArray.length - 1].location} </p>`)
      $("#firstCaption").append(`<p> ${eventArray[eventArray.length - 1].price} €</p>`)
      $("#firstCaption").append(`<p> Rating: ${eventArray[eventArray.length - 1].rating} </p>`)

      $("#secItem").append(`<img src='./images/${eventArray[eventArray.length - 2].name}.jpg' alt='Event'  >`)
      $("#secCaption").append(`<h1> ${eventArray[eventArray.length - 2].name} </h1>`)
      $("#secCaption").append(`<p> ${eventArray[eventArray.length - 2].location} </p>`)
      $("#secCaption").append(`<p> ${eventArray[eventArray.length - 2].price} €</p>`)
      $("#secCaption").append(`<p> Rating: ${eventArray[eventArray.length - 2].rating} </p>`)

      $("#thirdItem").append(`<img src='./images/${eventArray[eventArray.length - 3].name}.jpg' alt='Event' >`)
      $("#thirdCaption").append(`<h1> ${eventArray[eventArray.length - 3].name} </h1>`)
      $("#thirdCaption").append(`<p> ${eventArray[eventArray.length - 3].location} </p>`)
      $("#thirdCaption").append(`<p> ${eventArray[eventArray.length - 3].price} €</p>`)
      $("#thirdCaption").append(`<p>Rating: ${eventArray[eventArray.length - 3].rating} </p>`)
    },
  });
}
//***********************   MY liked STORIES   ****************************/
function showLikedStories() {
  $("#demo").empty();
  $("#demo").addClass("class='container-fluid'");
  $.ajax({
    beforeSend: function () { },
    type: "GET",
    url: "/api/events",
    success: function (data) {
      let eventArray = [];
      eventArray = data;

      for (let i = 0; i < eventArray.length; i++) {
        $("#demo").append(
          `<p> ${
          eventArray[i].name +
          eventArray[i].location +
          eventArray[i].price +
          eventArray[i].rating
          } </p>`
        );
      }
    },
  });
}
//***********************    PRODUCT SHOP    ****************************/
function showProductShop() {
  $("#demo").empty();
  $("#demo").addClass("class='container-fluid'");
  $('#demo').append("<h2>Product Catalouge </h2>");
  $('#demo').append("<div class='container'></div>")
  $('#demo').append("<div class='row' id='productColumn' ></div>");
  $.ajax({
    beforeSend: function () { },
    type: "GET",
    url: "/api/products",
    success: function (data) {
      let products = [];
      products = data;

      for (let i = 0; i < products.length; i++) {
        $("#productColumn").append(
          `<div class="column" style="padding:0 15px;"><h1> ${products[i].name} </h1><img src="./images/${products[i].name}.jpg" style="width:300px;height:300px"> <p> ${products[i].price} €<br>Rating: ${products[i].rating}<br>Stock: ${products[i].stock} </p><button class='btn-primary' id='${products[i]._id}' onClick='javascript:buyProduct("${products[i]._id}")' style='width:200px;'  >Buy ${products[i].name}</button></div>`
        );
        if (products[i].stock < 1) {
          $(`#${products[i]._id}`).prop("disabled", true).html("out of Stock");
        }
      }

    },
  });
}
function buyProduct(id) {
  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-token", usertoken)
    },
    type: "PUT",
    url: `/api/users/${currentUser}/profil`,
    data:
      { inventory: [id] },
    success: function (data) {

      decreaseProductStock(id);
      alert(`Product bought and waiting for admin to confirm`);
      showGiftshop()
    },
    error: function (error) {

      alert(error.responseText)
    }
  })
}
function decreaseProductStock(productID) {
  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-token", usertoken);
    },
    type: "PUT",
    url: `/api/products/${productID}`,
    data:
      { stock: 1 },
    success: function (data) {
      console.log(data.stock)
    },
    error: function (error) {
      alert(error.responseText + productID);
    }

  })

}
/*

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/altinzhuta/ExpressApp.git
git push -u origin master

*/
