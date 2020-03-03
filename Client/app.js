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
            }
        })
            
        BuildTable();
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
            }
        });

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

    function DisplayMovie()
    {
        let params = new URLSearchParams(window.location.search);
        movieId = params.get("movieId");

        $.ajax({
            url: 'https://localhost:44325/api/movie/' + id,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: data,
            success: function( data ){
                $("#MovieInfo").append("<tr>" +
                        "<td>" + "<a href='Detail.html'>" + data["title"] + "</a>" + "</td>" +
                        "<td>" + data["director"] + "</td>" +
                        "<td>" + data["genre"] + "</td>" +
                        "<td>" + "<button type='submit'>Edit</button>" + "</td>" +
                        "</tr>");
            }
        });
    }

    $(document).ready(BuildTable);
    $('#Create').submit( processCreateForm );
    $('#Search').submit( processSearchForm );
})(jQuery);

