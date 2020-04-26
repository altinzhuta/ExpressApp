// id from url todo *****
let id1 = "5ea4cd2d72ddd01f3413d4ed";
let id2 = "5e9926bd866a611a7080ee40";

$(document).ready(function () {
  $.ajax({
    beforeSend: function () {
      $("#p1").html("Rechne auf Server...");
    },
    type: "GET",
    url: `/events/${id1}`,
    success: function (data) {
      $("#p1").text(data.price + " €");
      $("#h3_1").html(data.name);
    },
  });

  $.ajax({
    beforeSend: function () {
      $("#p2").html("Rechne auf Server...");
    },
    type: "GET",
    url: `/users`,
    success: function (data) {
      $("#p2").text("number of users : " + data.length);
    },
  });

  $.ajax({
    beforeSend: function () {
      $("#p3").html("Rechne auf Server...");
    },
    type: "GET",
    url: `/events`,
    success: function (data) {
      $("#p3").text("number of events : " + data.length);
    },
  });

  $.ajax({
    beforeSend: function () {},
    type: "GET",
    url: `/events/${id2}`,
    success: function (data) {
      $("#h3_1").text("eventname mit " + id2 + " : " + data.name);
    },
  });
});

/* 

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/altinzhuta/crypt.git
git push -u origin master 

*/
