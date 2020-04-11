var movieQueryURL;
var drinkQueryURL;
var mealQueryURL;
var userInput;

$("input[type='radio']").click(function () {
    userInput = $("input[name='choices']:checked").val();
    userInput2 = $("input[name='partyChoices']:checked").val();
    checkUserInput();
})

function checkUserInput() {
    switch (userInput) {
        case "excited":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=28,12&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            console.log("excited clicked");
            break;

        case "thoughtful":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=99,36,10752&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink";
            break;

        case "sad":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=blue";
            break;

        case "supernatural":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=14,878&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z";
            break;

        case "happy":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/popular.php";
            break;

        case "angry":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=shot";
            break;

        case "romantic":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10749,35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute";
            break;
    }

    switch (userInput2) {
        case "withFamily":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10751&ertification.lte=G&api_key=e8f1cf6169288a814923ee8e5fe9e6f9";
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

$("#modalSubmit").on("click", function () {

    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function (response) {
        var movieArray = response.results;
        var lastRandom = [];
        var randomMovie;

        for (i = 0; i < 4; i++) {

            // Chooses random number, avoids duplicates
            if (lastRandom == '') {
                randomMovie = Math.floor((Math.random() * movieArray.length));
                lastRandom.push(randomMovie);
            } else {
                randomMovie = Math.floor((Math.random() * movieArray.length));
                if (lastRandom.includes(randomMovie)) {
                    randomMovie = Math.floor((Math.random() * movieArray.length));
                    lastRandom.push(randomMovie);
                }
            }

            // Assign variables for content
            var movieTitle = movieArray[randomMovie].title;
            var moviePosterPath = movieArray[randomMovie].poster_path;
            var moviePosterURL = "http://image.tmdb.org/t/p/w185" + moviePosterPath;
            var popularityRating = Math.round(movieArray[randomMovie].popularity) + "%"
            var overview = movieArray[randomMovie].overview;
            console.log(movieTitle);

            // Appends movie title to appropriate div
            $("#movie" + i).append(movieTitle);


        }
    });


})
