// Assign all necessary global variables
var movieQueryURL;
var drinkQueryURL;
var mealQueryURL;
var userInput;
var lastRandom = [];
var movieArray;
var randomMovie;
var newMovie;
var page = Math.floor(Math.random() * 12) + 1;

// Function to stop modal from closing when clicked outside
$("#WelcomeModal").modal({
    detachable: true,
    closable: false,
    transition: 'fade up',
    onApprove : function(){
        $("#modalSubmit").attr("type", "button");
    }
});

// On load, hide question 2 and the "enter" button and generate a "next" button
$(document).ready(function () {

    // By default, hide the second question and modalSubmit button
    $("#moodForm").hide();
    $("hr").hide();
    $("#modalSubmit").hide();

    // Create a "next" button to get to the next question
    var nextBtn = $("<button class='ui button' id='next'><i class='fas fa-arrow-right'></i></button>");
    $("#crowdForm").append($(nextBtn)).css("text-align", "center");
    $("label").css("justify-content", "center");

    // When the "next" button is clicked, show the second question
    // If no answers are selected, show error
    $("#next").on("click", function () {
        if ($("input[name='company']").is(':checked')) {
            $("#error").remove();
            $("#crowdForm").hide();
            $("#moodForm").show().css("text-align", "center");
            $("hr").hide();
            $("#next").hide();
            $("#modalSubmit").show();
        } else {
            console.log("error");
            $("#error").remove();
            $("#moodForm").hide();
            $("hr").hide();
            $("#modalSubmit").hide();
            $(".actions").prepend("<div id='error' style='color:red; text-align:center;'><h4>You must choose an option.</h4></div>");

        }
    });
})

// Function registers a radio button click
$("input[type='radio']").click(function () {
    userInput = $("input[name='mood']:checked").val();
    userInput2 = $("input[name='company']:checked").val();
    checkUserInput();
})

// Function to prevent repeat movies
function checkMovie(randomMovie) {
    if (lastRandom.indexOf(randomMovie) == -1) {
        lastRandom.push(randomMovie);
        newMovie = randomMovie;
    } else {
        randomMovie = Math.floor((Math.random() * movieArray.length));
        checkMovie(randomMovie);
    }
    return newMovie;
}

// Function checks user input and determines movie, drink, and meal query URLs based on TMDB API
function checkUserInput() {
    switch (userInput) {
        case "excited":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=28,12&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            console.log("excited clicked");
            break;

        case "thoughtful":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=99,36,10752&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
            break;

        case "sad":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=blue";
            break;

        case "supernatural":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=14,878&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z";
            break;

        case "happy":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/popular.php";
            break;

        case "angry":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=shot";
            break;

        case "romantic":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10749,35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute";
            break;
    }

    switch (userInput2) {
        case "withFamily":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10751&ertification.lte=G&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php"
            // must negate all other choices and go into family section
            break;

        case "flyingSolo":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert"
            break;

        case "withFriends":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=side";
            break;

        case "withSO":
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";
            break;
    }
}

// After answering both questions, create movie cards and randomly generate 3 movies based on user input
$("#modalSubmit").on("click", function () {
    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function (response) {
        movieArray = response.results;

        var movieContainer = $("<div>");
        $(movieContainer).attr({ "class": "ui special link cards", "id": "movieCard" });
        $("body").prepend($(movieContainer))

        for (i = 0; i < 4; i++) {

            // Generate random movie and check if it's already in the array of movies chosen
            randomMovie = Math.floor((Math.random() * movieArray.length));
            checkMovie(randomMovie);

            // Assign variables for content
            var movieTitle = movieArray[newMovie].title;
            var moviePosterPath = movieArray[newMovie].poster_path;
            var moviePosterURL = "http://image.tmdb.org/t/p/w154" + moviePosterPath;;
            var rating = movieArray[newMovie].vote_average;
            var overview = movieArray[newMovie].overview;
            var releaseDate = movieArray[newMovie].release_date;
            console.log(movieTitle);

            // Appends movie poster to the appropriate div
            var movieDivCard = $("<div>");
            var moviePoster = $("<div>");
            $(moviePoster).attr({ "class": "image", "id": "movieposter" }).append("<img src='" + moviePosterURL + "'/>");
            $(movieDivCard).attr("class", "card").append($(moviePoster));
            $(movieContainer).append($(movieDivCard));

            // If there moviePoster path is null, add placeholder image

            // Appends movie content to the appropriate div
            var movieContentDiv = $("<div>");
            $(movieContentDiv).attr({ "class": "content", "id": "movie-content" });
            $(movieDivCard).append($(movieContentDiv));

            // Create movie title header, append to movieContentDiv
            $(movieContentDiv).append("<a class='header' id='movie-title'>" + movieTitle + "</a>");

            // Create meta div and release date, append to movieContentDiv
            var metaDiv = $("<div>");
            $(metaDiv).attr("class", "meta").append("<span class='date'>Release Date: " + releaseDate + "</span>");
            $(movieContentDiv).append($(metaDiv));

            // Create movie description div, append to movieContentDiv
            $(movieContentDiv).append("<div class='description' id='movie-description'>" + overview + "</div>");


            // Create rating, append to movieDivCard
            $(movieDivCard).append("<div class='extra content' id='rating'><p>Rating: " + rating + "</p></div>");

            // By default, hide description & rating
            $(movieContentDiv).hide();
            $(".extra").hide();

            // On hover, show button to read more
            $(movieDivCard).mouseenter(function () {
                $(this).css({
                    "opacity": 0.3,
                    "transition": ".5s ease"
                }).append("<button class='ui button readMore'>Read More</button>");
            }).mouseleave(function () {
                $(this).css({
                    "opacity": 1,
                    "transition": ".5s ease"
                });
                $(".readMore").remove();
            });

            $(".readMore").on("click", function () {
                $(movieContentDiv).show();
                $(".extra").show();
            })
        }
    });

})


// On readMore button click, expand card to show description & rating



// Keep modal open when no radio buttons are clicked on moodForm

// Add placeholder images for movies that don't have one

// Function to clear all choices when startOver button is clicked

// Test all possibilities