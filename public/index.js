
let usertoken;
let currentUser;
let productID;
let userID;
let adminMethod;
$(document).ready(function () {
  //***********************   der shop startet mit den empfohlenen events in der bootstrap catalouge ansicht  ****************************/
  showBestOffers();

  //***********************   der Admin button und dazugehörige bereich wird nur bei gültiger anmeldung mit einem 
  //********                  usertoken der mit isAdmin=true gekennzeichnet ist                           ****************************/
  $("#sadminButton").hide("hide");


  //***********************    funktion um produkte in der navbar zu suchen und anzuzeigen  ****************************/
  $("#search").keypress(function () {
    $("a").remove(".searching");
    $.get(`/api/products/search/${$(this).val()}`, function (data) {
      for (let i = 0; i < data.length; i++) {
        $('#searchDropdown').append(`<a href="javascript:showProductShop()"  class="searching">${data[i].name} <br> </a>`)
      }

    });

  })


//***********************   Funktion die die anmeldedaten prüft   ****************************/
  $("#login").click(function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: { email: $("#email").val(), password: $("#password").val() },
      success: function (data, textStatus, request) {
        usertoken = request.getResponseHeader("x-token");
        currentUser = data._id;
        if (data.isAdmin == true) {
          $("#sadminButton").show();
        }
        alert("User log in successfull");
      },
      error: function (error) {
        alert(error.statusText);
      },
    });
  });
//***********************   globale variablen mit usertoken und userID werden geleert    ****************************/
  $("#logout").click(function () {
    usertoken = null;
    currentUser = null;
    if (usertoken || currentUser == null) alert("log out successful!");
    else alert("logout failed");
  });
  //***********************  Funktion um textdaten im modal zu leeren falls esgeschlossen wird  ****************************/
  $("#registerModal").on("hidden.bs.modal", function () {
    $(":input", this).val("");
  });
  //***********************   Funktion um die eingegeben daten im regestrierungs modal zu prüfen und einen benutzer zu erstellen  ****************************/
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
  //***********************  Funktion um die eingegeben werte im produkt edetierungs modal zu überprüfen un zu verarbeiten    ****************************/
  $("#updateProductM").click(function (event) {
    event.preventDefault;
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken)
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

  //*********************** Funktion um die eingebenen werte im modal für die editierung des users zu prüfen (ajax)    ****************************/
  $("#updateUserM").click(function (event) {
    event.preventDefault
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken)
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

//***********************   Funktion alle user anzuzeigen und die option gibt ob man sie editieren/löschen möchte (nur admin)  ****************************/
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

//***********************   Funktion alle produkte anzuzeigen und die option gibt ob man sie editieren/löschen möchte (nur admin)  ****************************/
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
//***********************   Hilfsmethoden für den adminbereich. Einstellung von PUT oder DELETE ****************************/
function setproduct(id, method) {
  productID = id;
  adminMethod = method
}
function setuser(id, method) {
  userID = id;
  adminMethod = method;
}


//***********************   Zeigt benutzer an denen man folgt und die option ihnen eine emeil zu schreiben  ****************************/
function showMyFriends() {
  $("#demo").empty();
  $("#demo").append("<div class='container-fluid' style='border:5px solid #555;' id='friends'></div>")

  $('#friends').append("<h1> Mail People you follow. </h1>");

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
  $.get("/api/users", function (data) {
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
  })

}
function writeEmail() {
  alert("to do: MailService");
}



/*

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/altinzhuta/ExpressApp.git
git push -u origin master

*/
