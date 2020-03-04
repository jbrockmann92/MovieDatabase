(function($){

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
            },
        });
        $("#MovieUrl").append("<button onclick=editMovieImage(" + movieId + ")>Add or change this image</button>");
    }

    $(document).ready(DisplayMovie);
})(jQuery);
