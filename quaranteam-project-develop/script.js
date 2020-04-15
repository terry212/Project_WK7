// Assign all necessary global variables
var movieQueryURL;
var mealQueryURL;
var userInput;
var userInput2;
var lastRandom = [];
var movieArray = [];
var randomMovie;
var newMovie;
var page = Math.floor(Math.random() * 12) + 1;
var drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";

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
            console.log("excited clicked");
            break;

        case "thoughtful":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=99,36,10752&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "sad":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "supernatural":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=14,878&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "happy":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "angry":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "inquisitive":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=9648,80,27,53&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
            break;

        case "romantic":
            movieQueryURL = "https://api.themoviedb.org/3/discover/movie?with_genres=10749,35&api_key=e8f1cf6169288a814923ee8e5fe9e6f9&page=" + page;
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
    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function (response) {
        for(var i = 0; i < 4; i++){
            movieArray = response.results;
            console.log(response);

            randomMovie = Math.floor((Math.random() * movieArray.length));
            checkMovie(randomMovie);

            var movieContainer = $("#movies");
                
            var movieCard =`
                            <div class="card col-md">
                                <img class="card-img-top" id='poster' src="https://image.tmdb.org/t/p/w185${movieArray[i].poster_path}" alt="${movieArray[i].title}">
                                <button type="button" class="readMore btn btn-primary btn-lg" id="readMore${i}">Read More</button>
                                <div class="card-body" style="display:none" id="movie-content${i}">
                                    <h5 class="card-title" id="movie-title">${movieArray[i].title}</h5>
                                    <div class="meta">
                                        <span class="date" alt="${movieArray[i].title}">Release Date: ${movieArray[i].release_date}</span>
                                    </div>
                                    <p class="card-text" id="movie-description">${movieArray[i].overview}</p>
                                </div>
                                <div class="card-footer movie-content" style="display:none" id="rating${i}">
                                    <small class="text-muted">Rating: ${movieArray[i].vote_average}</small><br>
                                    <button type="button" class="select btn btn-primary btn-sm" id="select${i}">Select Movie</button>
                                </div>
                            </div>
                        `
            $(movieContainer).append($(movieCard));
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
                        $("#rating0").hide();
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
                        $("#rating1").hide();
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
                        $("#rating2").hide();
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
                        $("#rating3").hide();
                        $(this).text("Read More");
                    }
                break;
            }
        });
    })
    $("#WelcomeModal").modal("hide");
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
                            <div class="card col-md text-center">
                                <img class="card-img-top" src="${response.meals[i].strMealThumb}" alt="${response.meals[i].strMeal}">
                                <div class="card-body" id="food-content">
                                    <h5 class="card-title" id="food-name">${response.meals[i].strMeal}</h5>
                                    <a class="btn btn-primary btn-lg" href="#" role="button">Select Item</a>
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

            var drinkCard = `<div class="card col-md text-center">
                                <img class="card-img-top" src="${response.drinks[i].strDrinkThumb}" alt="${response.drinks[i].strDrink}">
                                <div class="card-body" id="drink-content">
                                    <h5 class="card-title" id="drink-name">${response.drinks[i].strDrink}</h5>
                                    <div class="meta">
                                        <span class="type">${response.drinks[i].strAlcoholic}</span>
                                    </div>
                                    <p class="card-text" id="drink-ingredients"> Ingredients: ${drinksIn}</p>
                                    <a class="btn btn-primary btn-lg" href="#" role="button">Select Item</a>
                                </div>
                                
                            </div>`

            

            drinkContainer.append(drinkCard);
        }
    }); 

}
