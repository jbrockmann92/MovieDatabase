//Want to have all movies in the db on the screen as default
//Want to have the option to update each movie's details
//Want to have the option to add a new movie

//Bonus: want to add/edit/see image for a movie
//Bonus: want to be able to search by one of the movie's fields, Title, Genre, Director

// $.getJSON("https://localhost:44325/api/movie", function( data ){
//         var movies = [];
//         $.each( data, function(key, val) {
//             movies.push(val);
//         });
//     })
var movies = [];

$.ajax({
    dataType: 'json',
    url: "https://localhost:44325/api/movie",
    type: "get",
    success: function( data ){
                $.each( data, function(key, movie) {
                    $("#MovieInfo").append("<tr>" +
                    "<td>" + movie["title"] + "</td>" +
                    "<td>" + movie["genre"] + "</td>" +
                    "<td>" + movie["director"] + "</td>" +
                    "<td>" + "<button id=" + "EditMovie" + ">Edit</button>" + "</td>" +
                "</tr>");
                });
            }
})

$("#EditMovie").submit(function(){
    var test = $('<button/>',
    {
        text: 'Test',
        click: function() {alert(hi);}
    });
})