// id from url todo *****
let id1 = "5ea4cd2d72ddd01f3413d4ed";
let id2 = "5e9926bd866a611a7080ee40";

$(document).ready(function () {
  $("#demo").carousel({
    interval: 6000,
  });
  $.ajax({
    beforeSend: function () {
      $("#p1").html("Rechne auf Server...");
    },
    type: "GET",
    url: `/events/${id1}`,
    success: function (data) {
      $("#p1").html(data.price + " €");
      $("#h3_1").html(data.name);
    },
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
