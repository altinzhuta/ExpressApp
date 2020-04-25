
// id from url todo *****
let id1 = '5e98d9b6a2fe443858997e7e';
let id2 = '5e9926bd866a611a7080ee40';


$(document).ready(function () {
    $('#btn').click(function () {
        $.ajax({
            beforeSend: function () {
                $('#results').html('Rechne auf Server...');
            },
            type: 'GET', url: `/users/${id1}`, success: function (data) {
                $('#results').text("user name with id- " + id1 + " : " + data.name);
            }
        });
    });
    $('#btn2').click(function () {
        $.ajax({
            beforeSend: function () {
                $('#results2').html('Rechne auf Server...');
            },
            type: 'GET', url: `/users`, success: function (data) {
                $('#results2').text("number of users : " + data.length);
            }
        });
    });
    $('#btn3').click(function () {
        $.ajax({
            beforeSend: function () {
                $('#results3').html('Rechne auf Server...');
            },
            type: 'GET', url: `/events`, success: function (data) {
                $('#results3').text("number of events : " + data.length);
            }
        });
    });
    $('#btn4').click(function () {
        $.ajax({
            beforeSend: function () {
                $('#results4').html('Rechne auf Server...');
            },
            type: 'GET', url: `/events/${id2}`, success: function (data) {
                $('#results4').text("eventname mit " + id2 + " : " + data.name);
            }
        });
    });
});

/* 

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/altinzhuta/crypt.git
git push -u origin master 

*/
