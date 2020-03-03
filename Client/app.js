(function($){
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
                BuildTable();
            }
        })
            
        
        e.preventDefault();
    }

    function processSearchForm( e ){
        let params = new URLSearchParams(window.location.search);

        var dict = {
        	Title : params.get("searchtitle"),
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

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'text',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data ){
                data = filterMovies(data);
                $.each(data, function (key, movie) {
                        $("#MovieInfo").append("<tr>"
                        + "<td>"
                        + "<a href='Detail.html?movieId=" + movie["movieId"] + "'>"
                        + movie["title"]
                        + "</a>"
                        + "</td>"
                        + "<td>"
                        + movie["genre"]
                        + "</td>"
                        + "<td>"
                        + movie["director"]
                        + "</td>"
                        + "<td>"
                        + "<button type='submit'>Edit</button>" + "</td>" +
                        "</tr>");
                })
            }
        });

        e.preventDefault();
    }

    function BuildTable() {
        let params = new URLSearchParams(window.location.search);

        var dict = {
        	Title : params.get("searchtitle"),
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
        $.ajax({
            dataType: 'json',
            url: "https://localhost:44325/api/movie",
            type: "get",
            success: function (data) {
                let movies = filterMovies(data, dict.Title, dict.Director, dict.Genre);
                $.each(movies, function (key, movie) {
                    $("#MovieInfo").append("<tr>"
                        + "<td>"
                        + "<a href='Detail.html?movieId=" + movie["movieId"] + "'>"
                        + movie["title"]
                        + "</a>"
                        + "</td>"
                        + "<td>"
                        + movie["genre"]
                        + "</td>"
                        + "<td>"
                        + movie["director"]
                        + "</td>"
                        + "<td>"
                        + "<button type='submit'>Edit</button>" + "</td>" +
                        "</tr>");
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

    $(document).ready(BuildTable);
    $('#Create').submit( processCreateForm );
})(jQuery);