$(document).ready(function () {
  let usertoken;
  let currentUser;
  $("#login").submit(function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/login",
      data: { email: $("#email").val(), password: $("#password").val() },
      success: function (data, textStatus, request) {
        usertoken = request.getResponseHeader("x-token");
        currentUser = data._id;
        alert("User log in successfull");
      },
      error: function (error) {
        alert(error.statusText);
      },
    });
  });
  $("#demo").carousel({
    interval: 6000,
  });
  $("#testButton").click(function () {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("x-token", usertoken);
      },
      type: "GET",
      url: `/users/${currentUser}`,
      success: function (data) {
        alert(
          "Name: " + data.name + " ID: " + data._id + " email: " + data.email
        );
      },
      error: function (error) {
        alert(error.statusText);
      },
    });
  });

  $.ajax({
    beforeSend: function () {
      $("#p3").html("Rechne auf Server...");
    },
    type: "GET",
    url: `/events`,
    success: function (data) {
      $("#p3").html("number of events : " + data.length);
      $("#h3_3").html("third Position");
    },
  });

  $.ajax({
    beforeSend: function () {},
    type: "GET",
    url: `/events`,
    success: function (data) {
      $("#h3_2").html("Second position");
      $("#p2").html("Seconde description");
    },
  });
});

/* 

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/altinzhuta/ExpressApp.git
git push -u origin master 

*/
