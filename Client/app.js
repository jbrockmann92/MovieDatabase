function processCreateForm( e ){
    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'text',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function(){
            BuildTable(true);
        }
    })
        
    e.preventDefault();
}

function BuildTable(NewMovie=false) {
    let params = new URLSearchParams(window.location.search);

    var dict = {
        Title: params.get("searchtitle"),
        Director: params.get("searchdirector"),
        Genre: params.get("searchgenre")
    };

    $("#MovieInfo").html(""
        + "<tr class='table-primary'>"
        + "<th>Title</th>"
        + "<th>Genre</th>"
        + "<th>Director</th>"
        + "<th></th>"
        + "</tr>");

    if(currentMovies == null || NewMovie)
    {
        currentMovies = getMovies();
    }
    if(dict.Title != null || dict.Director != null || dict.Genre  != null)
    {
        currentMovies = filterMovies(currentMovies, dict.Title, dict.Director, dict.Genre);
    }

    for (movie in currentMovies) {
        $("#MovieInfo").append("<tr>"
            + "<td>"
            + "<a href='Detail.html?movieId=" + currentMovies[movie]["movieId"] + "'>"
            + currentMovies[movie]["title"]
            + "</a>"
            + "</td>"
            + "<td>"
            + currentMovies[movie]["genre"]
            + "</td>"
            + "<td>"
            + currentMovies[movie]["director"]
            + "</td>"
            + "<td>"
            + "<button onclick='editMovie(" + currentMovies[movie]["movieId"] + ")' type='button'>Edit</button>" + "</td>" +
            "</tr>");
    }

    $("#MovieInfo").append("<tr>"
        + "<td>"
        + "<input type='text' name='title' placeholder='Title' /> "
        + "</td>"
        + "<td>"
        + "<input type='text' name='genre' placeholder='Genre' />"
        + "</td>"
        + "<td>"
        + "<input type='text' name='director' placeholder='Director' />"
        + "</td>"
        + "<td>"
        + "<button id='CreateButton' type='submit'>Create</button>"
        + "</td>"
        + "</tr>");
}

function getMovies()
{
    var movies;
    $.ajax({
        url: "https://localhost:44325/api/movie",
        type: "get",
        async:false,
        success: function (data) {
            movies = data;
        }
    });
    return movies;
}

function filterMovies(data, title=null, director=null, genre=null)
{
    let movies = data;
    // movies = movies.filter(movie => title == "" ? true : movie["title"] == title && director == "" ? true : movie["director"] && genre == "" ? true : movie["genre"]);
    if(title != "" && title != null)
    {
        movies = movies.filter(movie => movie["title"] == title);
    }
    if(director != "" && director != null)
    {
        movies = movies.filter(movie => movie["director"] == director);
    }
    if(genre != "" && genre != null)
    {
        movies = movies.filter(movie => movie["genre"] == genre);
    }

    return movies;
}

function editMovie(id){
    //Need to take in the movie's id (done), then get the movie from the db that has that id,
    //Then call the put method in the c# code

    $.ajax({
        dataType: 'json',
        url: "https://localhost:44325/api/movie/" + id,
        type: "get",
        data: {},
        success: function( movie ){
            movie.title = prompt("Please enter a new title", movie.title);
            movie.genre = prompt("Please enter a new genre", movie.genre);
            movie.director = prompt("Please enter a new director", movie.director);
            movie.movieId = id;
            putMovie(movie);
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
            BuildTable();
        }
    });
}

function defaultSearch(){
    let params = new URLSearchParams(window.location.search);
    let title = ((params.get("searchtitle") == "" || params.get("searchtitle") == null)? null : params.get("searchtitle"));
    let genre = ((params.get("searchgenre") == "" || params.get("searchgenre") == null) ? null : params.get("searchgenre"));
    let director = ((params.get("searchdirector") == "" || params.get("searchdirector") == null) ? null : params.get("searchdirector"));
    if(title != null)
    {
        document.getElementById("searchtitle").defaultValue = title;
    }
    if(genre != null)
    {
        document.getElementById("searchgenre").defaultValue = genre;
    }
    if(director != null)
    {
        document.getElementById("searchdirector").defaultValue = director;
    }
}

var currentMovies;

$(document).ready(BuildTable);
$( window ).on( "load", defaultSearch);
$('#Create').submit( processCreateForm );
$('#Search').submit( BuildTable );