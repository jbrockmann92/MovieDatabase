function displayMovie() {
    $("#MovieTitle").html(movie["title"]);
    $("#MovieDirector").html(movie["director"]);
    $("#MovieGenre").html(movie["genre"]);
    var image = movie["imageUrl"];
    $("#MovieImage").html("<img style='height:inherit; width:inherit;' src='" + image + "'>");
}

function getMovie() {
    let params = new URLSearchParams(window.location.search);
    movieId = params.get("movieId");

    $.ajax({
        url: 'https://localhost:44325/api/movie/' + movieId,
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function (data) {
            movie = data;
            displayMovie();
        }
    });
}

function editMovie() {
    let input = prompt("Please Enter the URL of the image you'd like to add", "");
    if (input != null && input != "") {
        movie["imageUrl"] = input;
    }
    else if (input = " ") {
        return;
    }
    else {
        editMovie();
    }

    putMovie();
}

var movie;

function putMovie() {
    $.ajax({
        url: "https://localhost:44325/api/movie/",
        type: "put",
        dataType: "text",
        data: JSON.stringify(movie),
        contentType: "application/json",
        success: function () {
            displayMovie();
        }
    });
};

$(document).ready(getMovie);
