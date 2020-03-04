function DisplayMovie()
    {
        let params = new URLSearchParams(window.location.search);
        movieId = params.get("movieId");

        $.ajax({
            url: 'https://localhost:44325/api/movie/' + movieId,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data ){
                $("#MovieTitle").append(data["title"]);
                $("#MovieDirector").append(data["director"]);
                $("#MovieGenre").append(data["genre"]);
                $("#MovieImage").append("<img style= 'height:inherit; width:inherit' src=" + data["imageUrl"] + "></img>");
                $("#MovieButton").append("<button onclick=editMovieImage(" + movieId + ")>Add or change this image</button>");
            },
        });
    }

    function editMovieImage(id){
        $.ajax({
            dataType: 'json',
            url: "https://localhost:44325/api/movie/" + id,
            async: false,
            type: "get",
            data: {},
            success: function( movie ){
                movie.ImageUrl = prompt("Please enter the url of the image you'd like to use", movie.imageUrl);
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
                location.reload();
                DisplayMovie();
            }
        });
    };

    $(document).ready(DisplayMovie);
