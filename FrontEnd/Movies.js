//Want to have all movies in the db on the screen as default
//Want to have the option to update each movie's details
//Want to have the option to add a new movie

//Bonus: want to add/edit/see image for a movie
//Bonus: want to be able to search by one of the movie's fields, Title, Genre, Director

$.getJSON("https://localhost:44325/api/movie", function( data ){
        var items = [];
        $.each( data, function(key, val) {
            items.push(val);
        });
    })
//Will run as soon as the script is run

function printAllMovies(){
    var movieInjection;
    for(movie in items){
        movieInjection.append("<tr>" +
            "<td>" + items[movie].Title + "</td>" +
            "<td>" + items[movie].Genre + "</td>" +
            "<td>" + items[movie].Director + "</td>" +
        "</tr>")
    }
    return movieInjection;
}

$("MovieInfo").html(printAllMovies());