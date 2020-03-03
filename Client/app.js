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
