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
        }
    })
        
    BuildTable();
    e.preventDefault();
}

function BuildTable() {
    $("#MovieInfo").html(""
        + "<tr class='table-primary'>"
        + "<th>Title</th>"
        + "<th>Genre</th>"
        + "<th>Director</th>"
        + "<th></th>"
        + "</tr>");
    $.ajax({
        dataType: 'json',
        url: "https://localhost:44325/api/movie",
        type: "get",
        success: function (data) {
            $.each(data, function (key, movie) {
                $("#MovieInfo").append("<tr>"
                    + "<td>"
                    + "<a href='Detail.html?movieId=" + movie["movieId"] + "'>"
                    + movie["title"]
                    + "</a>"
                    + "</td>"
                    + "<td>"
                    + movie["director"]
                    + "</td>"
                    + "<td>"
                    + movie["genre"]
                    + "</td>"
                    + "<td>"
                    + "<button type='button'" 
                    + " onclick=" 
                    + "editMovie(" 
                    + movie["movieId"] 
                    + ")" 
                    + ">Edit</button>" 
                    + "</td>" 
                    + "</tr>");
            })
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
    });
}

$(document).ready(BuildTable);
$('#Create').submit( processCreateForm );
deleteFinal();

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
            BuildTable();
        },
        error: function(){
            alert("Didn't work.")
        }
    });
}

function deleteFinal(){

}