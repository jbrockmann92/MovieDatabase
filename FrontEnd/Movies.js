//Want to have all movies in the db on the screen as default
//Want to have the option to update each movie's details
//Want to have the option to add a new movie

//Bonus: want to add/edit/see image for a movie
//Bonus: want to be able to search by one of the movie's fields, Title, Genre, Director

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
                    "<td>" + "<button" + " onclick=" + "editMovie(" + movie["movieId"] + ")" + ">Edit</button>" + "</td>" +
                "</tr>");
                });
            }
})

function editMovie(id){
    //Need to take in the movie's id (done), then get the movie from the db that has that id,
    //Then call the put method in the c# code
    var movie;

    $.ajax({
        dataType: 'json',
        url: "https://localhost:44325/api/movie",
        type: "get",
        success: function( data ){
            movie = data.filter(function(el){
                if (el.movieId === id){
                    return true;
                }
                else{
                    return false;
                }
            })
            prompt("Please enter a new title", movie[0].title);
            prompt("Please enter a new genre", movie[0].genre);
            prompt("Please enter a new director", movie[0].director);
        }
    })
}