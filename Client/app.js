(function($){
    function processCreateForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value,
        	Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    function processSearchForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value,
        	Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#Create').submit( processCreateForm );
    $('#Search').submit( processSearchForm );
})(jQuery);

$(document).ready(BuildTable);

function BuildTable()
{
    $.ajax({
        dataType: 'json',
        url: "https://localhost:44325/api/movie",
        type: "get",
        success: function( data ){
                    $.each( data, function(key, movie) {
                        $("#MovieInfo").append("<tr>" +
                        "<td>" + "<a href=''>" + movie["title"] + "</a>" + "</td>" +
                        "<td>" + movie["genre"] + "</td>" +
                        "<td>" + movie["director"] + "</td>" +
                        "<td>" +   "<button type='submit'>Edit</button>" + "</td>" +
                    "</tr>");
                    })
                    $("#MovieInfo").append("<tr>" 
                    + "<td>" +   "<input type='text' name='title' placeholder='Title' /> " + "</td>"
                    + "<td>" +   "<input type='text' name='director' placeholder='Director' />" + "</td>"
                    + "<td>" +   "<input type='text' name='genre' placeholder='Genre' />" + "</td>"
                    + "<td>" +   "<button type='submit'>Create</button>" + "</td>"
                    +   "</tr>");
                }
    })
}

//my stuff

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

var movie;

function editMovie(id){
    //Need to take in the movie's id (done), then get the movie from the db that has that id,
    //Then call the put method in the c# code

    $.ajax({
        dataType: 'json',
        url: "https://localhost:44325/api/movie/" + id,
        async: false,
        type: "get",
        success: function( movie ){
            movie.title = prompt("Please enter a new title", movie.title);
            movie.genre = prompt("Please enter a new genre", movie.genre);
            movie.director = prompt("Please enter a new director", movie.director);
            movie.movieId = id;
            putMovie(movie, id);
        },
        error: function(){
            alert("Error!");
        }
    });
}

function putMovie(data){
    $.ajax({
        url: "https://localhost:44325/api/movie/",
        type: "put",
        dataType: "text",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(){
            
        },
        error: function(){
            alert("Didn't work.")
        }
    });
}