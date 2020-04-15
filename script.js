// Assign all necessary global variables
var movieQueryURL;
var drinkQueryURL;
var mealQueryURL;
var userInput;
var lastRandom = [];
var movieArray = [];
var randomMovie;
var newMovie;
var page = Math.floor(Math.random() * 12) + 1;
var movieContentDiv;
var movieDivCard;

// Stops modal from closing when clicked outside
$("#WelcomeModal").modal({
    backdrop: 'static',
    keyboard: false
});

// On load, hide question 2 and the "enter" button and generate a "next" button
$(document).ready(function () {

    // By default, hide the second question and modalSubmit button
    $("#moodForm").hide();
    $("hr").hide();
    $(".modal-footer").hide();

    // Create a "next" button to get to the next question
    var nextBtn = $("<button class='btn btn-light' type='button' id='next'><i class='fas fa-arrow-right'></i></button>");
    $("#crowdForm").append($(nextBtn));

    // When the "next" button is clicked, show the second question
    // If no company answers are selected, show error
    $("#next").on("click", function () {
        $("#error").remove();
        $("#crowdForm").hide();
        $("#moodForm").show();
        $("hr").hide();
        $("#next").hide();
        $(".modal-footer").show();
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
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;

        case "sad":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;

        case "supernatural":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=14,878&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;

        case "happy":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;

        case "angry":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;

        case "inquisitive":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=9648,80,27,53&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;

        case "romantic":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10749,35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
            break;
    }

    switch (userInput2) {
        case "family":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10751&certification.lte=G&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php?";
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php"
            break;

        case "solo":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert"
            break;

        case "friends":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=side";
            break;

        case "spouse":
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";
            break;
    }
}

// After answering both questions, create movie cards and randomly generate 3 movies based on user input
$("#submitButton").on("click", function () {
    if (movieQueryURL == undefined) {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=28,12&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
        drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";
    }

    if (mealQueryURL == undefined) {
        mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert";
    }

    generateMovie();
    generateFood();
    generateDrink();
})


function generateMovie(){
    // Keep modal open when no radio buttons are clicked on moodForm
    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function (response) {
        movieArray = response.results;

        // Create container for movie cards
        var movieContainer = $("<div>");
        $(movieContainer).attr({ "class": "col-xs-12 card movie", "id": "movieDisplay" });
        $("#movies").prepend($(movieContainer))

        for (i = 0; i < 4; i++) {

            // Generate random movie and check if it's already in the array of movies chosen
            randomMovie = Math.floor((Math.random() * movieArray.length));
            checkMovie(randomMovie);

            // Assign variables for content
            var movieTitle = movieArray[newMovie].title;
            var moviePosterPath = movieArray[newMovie].poster_path;
            var moviePosterURL;
            var rating = movieArray[newMovie].vote_average;
            var overview = movieArray[newMovie].overview;
            var releaseDate = movieArray[newMovie].release_date;
            console.log(movieTitle);

            // If there moviePoster path is null, add placeholder image
            if (moviePosterPath !== null) {
                moviePosterURL = "http://image.tmdb.org/t/p/w185" + moviePosterPath;
            } else {
                moviePosterURL = "./Assets/Images/missingposter.png";
            }

            // Appends movie poster to the appropriate div
            movieDivCard = $("<div>");
            var moviePoster = $("<div>");
            $(moviePoster).attr({ "class": "image", "id": "movieposter" }).append("<img src='" + moviePosterURL + "'/>");
            $(movieDivCard).attr("class", "card col-sm-3").append($(moviePoster));
            $(movieContainer).append($(movieDivCard));

            // Appends movie content to the appropriate div
            movieContentDiv = $("<div>");
            $(movieContentDiv).attr({ "class": "content", "id": "movie-content" + i + "" });
            $(moviePoster).append($(movieContentDiv));

            // Create movie title header, append to movieContentDiv
            $(movieContentDiv).append("<a class='header' id='movie-title'>" + movieTitle + "</a>");

            // Create meta div and release date, append to movieContentDiv
            var metaDiv = $("<div>");
            $(metaDiv).attr("class", "meta").append("<span class='date'>Release Date: " + releaseDate + "</span>");
            $(movieContentDiv).append($(metaDiv));

            // Create movie description div, append to movieContentDiv
            $(movieContentDiv).append("<div class='description' id='movie-description'>" + overview + "</div>");


            // Create rating, append to movieDivCard
            $(moviePoster).append("<div class='extra content' id='rating" + i + "'><p>Rating: " + rating + "</p></div>");

            // Create button for reading more info
            var readMoreBtn = $("<button class='readMore btn btn-light' type='button' id='readMore"+ i +"'>Read More</button>");
            $(moviePoster).append($(readMoreBtn));


            // By default, hide description & rating
            $(movieContentDiv).css("display", "none");
            $(".extra").hide();
            $(readMoreBtn).css("display", "none");

            // On hover, show button to read more
            $(movieDivCard).mouseenter(function () {
                $(this).find('button').css("display", "block");
            }).mouseleave(function () {
                $(this).find('button').css("display", "none");
            });
        }
        $(".readMore").on("click", function () {
            switch ($(this).attr('id')) {
                case "readMore0":
                    if ($('#movie-content0').css('display') == "none") {
                        $('#movie-content0').css("display", "block");
                        $("#rating0").show();
                        $(this).text("Read Less");
                    } else {
                        $('#movie-content0').css("display", "none");
                        $(".extra").hide();
                        $(this).text("Read More");
                    }
                break;
                case "readMore1":
                    if ($('#movie-content1').css('display') == "none") {
                        $('#movie-content1').css("display", "block");
                        $("#rating1").show();
                        $(this).text("Read Less");
                    } else {
                        $('#movie-content1').css("display", "none");
                        $(".extra").hide();
                        $(this).text("Read More");
                    }
                break;
                case "readMore2":
                    if ($('#movie-content2').css('display') == "none") {
                        $('#movie-content2').css("display", "block");
                        $("#rating2").show();
                        $(this).text("Read Less");
                    } else {
                        $('#movie-content2').css("display", "none");
                        $(".extra").hide();
                        $(this).text("Read More");
                    }
                break;
                case "readMore3":
                    if ($('#movie-content3').css('display') == "none") {
                        $('#movie-content3').css("display", "block");
                        $("#rating3").show();
                        $(this).text("Read Less");
                    } else {
                        $('#movie-content3').css("display", "none");
                        $(".extra").hide();
                        $(this).text("Read More");
                    }
                break;
            }

            
        })
        $("#WelcomeModal").modal("hide");
    });
}

function generateFood(){

    $.ajax({
        url: mealQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var foodContainer = $('#food');

        for(var i = 0; i < 4; i++){
            
            var foodCard =`
                            <div class="card col-md">
                                <img class="card-img-top" src="${response.meals[i].strMealThumb}" alt="${response.meals[i].strMeal}">
                                <div class="card-body" id="food-content">
                                    <h5 class="card-title" id="food-name">${response.meals[i].strMeal}</h5>
                                </div>
                            </div>
                        `

            foodContainer.append(foodCard);
        }
    }); 

}

function generateDrink(){

    var drinkContainer = $('#drinks');

    $.ajax({
        url: drinkQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        
        for(var i = 0; i < 4; i++){
            var drinkIn = '';
            // debugger;
            // for(var k = 0; k < 15; k++){
            //     var n = 1;
            //     if(response.drinks[i].strIngredient[n] != null){
            //         drinkIn = drinkIn + ', ' + response.drinks[i].strIngredient[n];
            //     }
            //     n++;
            // }

            if(response.drinks[i].strIngredient1 != null){
                drinksIn = response.drinks[i].strIngredient1;
            }
            
            if(response.drinks[i].strIngredient2 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient2;
            }
            
            if(response.drinks[i].strIngredient3 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient3;
            }
            
            if(response.drinks[i].strIngredient4 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient4;
            }
            
            if(response.drinks[i].strIngredient5 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient5;
            }
            
            if(response.drinks[i].strIngredient6 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient6;
            }
            
            if(response.drinks[i].strIngredient7 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient7;
            }
            
            if(response.drinks[i].strIngredient8 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient8;
            }
            
            if(response.drinks[i].strIngredient9 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient9;
            }
            
            if(response.drinks[i].strIngredient10 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient10;
            }
            
            if(response.drinks[i].strIngredient11 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient11;
            }
            
            if(response.drinks[i].strIngredient12 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient12;
            }
            
            if(response.drinks[i].strIngredient13 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient13;
            }
            
            if(response.drinks[i].strIngredient14 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient14;
            }
            
            if(response.drinks[i].strIngredient15 != null){
                drinksIn = drinksIn + response.drinks[i].strIngredient15;
            }

            var drinkCard = `<div class="card col-md">
                                <img class="card-img-top" src="${response.drinks[i].strDrinkThumb}" alt="${response.drinks[i].strDrink}">
                                <div class="card-body" id="drink-content">
                                    <h5 class="card-title" id="drink-name">${response.drinks[i].strDrink}</h5>
                                    <div class="meta">
                                        <span class="type">${response.drinks[i].strAlcoholic}</span>
                                    </div>
                                    <p class="card-text" id="drink-ingredients"> Ingredients: ${drinksIn}</p>
                                </div>
                                
                            </div>`

            

            drinkContainer.append(drinkCard);
        }
    }); 

}
