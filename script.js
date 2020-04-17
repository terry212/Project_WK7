// Assign all necessary global variables
var movieQueryURL;
var mealQueryURL;
var userInput;
var userInput2;
var lastRandom = [];
var movieArray = [];
var mealArray = [];
var randomMealArray = [];
var randomMovie;
var newMovie;
var randomMeal;
var newMeal;
var page = Math.floor(Math.random() * 12) + 1;
var drinkQueryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php";

// Stops modal from closing when clicked outside
$("#WelcomeModal").modal({
    backdrop: 'static',
    keyboard: false
});

$(document).ready(function () {

    // By default, hide form questions
    $("#crowdForm").hide();
    $(".jumbotron").hide();
    $("#moodForm").hide();
    $(".modal-footer").hide();
    $(".footer").hide();

    // Create a new button to get started
    var getStarted = $("<div id='getStarted'><button class='btn btn-primary' type='button'>Get Started!</button></div>");
    $(".first").append($(getStarted));

    // Create a "next" button to get to the next question
    var nextBtn = $("<div id='next'><button class='btn btn-primary' type='button'><i class='fas fa-arrow-right'></i></button></div>");
    $(".form-group").append($(nextBtn));
    $("#next").hide();

    // When get started button clicked, go to first question
    $("#getStarted").on("click", function () {
        $(".instructions").hide();
        $("#getStarted").hide();
        $("#crowdForm").show();
        $("#next").show();
    })

    // When the "next" button is clicked, show the second question
    $("#next").on("click", function () {
        $("#crowdForm").hide();
        $("#moodForm").show();
        $("#next").hide();
        $(".modal-footer").show();
    });

    // When restart button clicked, reload page
    $("#reload").click(function () {
        location.reload(true);
    });

    // Within "review order", when restart button clicked, reload page
    $("#footerReload").click(function () {
        location.reload(true);
    });
})

// Function registers a radio button click, determines value of user input and checks
$("input[type='radio']").click(function () {
    userInput = $("input[name='mood']:checked").val();
    userInput2 = $("input[name='company']:checked").val();
    checkUserInput();
})

// Function to check movie array and prevent repeat movies
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

// Function to check meal array and prevent repeat meals
function checkMeal(randomMeal) {
    if (randomMealArray.indexOf(randomMeal) == -1) {
        randomMealArray.push(randomMeal);
        newMeal = randomMeal;
    } else {
        randomMeal = Math.floor((Math.random() * mealArray.length));
        checkMeal(randomMeal);
    }
    return newMeal;
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
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";
            $(".custom").empty();
            $(".custom").append(" " + userInput2);
            break;

        case "solo":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert"
            $(".custom").empty();
            $(".custom").append("self");
            break;

        case "friends":
            mealQueryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=side";
            $(".custom").empty();
            $(".custom").append(" " + userInput2);
            break;

        case "spouse":
            mealQueryURL = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";
            $(".custom").empty();
            $(".custom").append(" love");
            break;
    }
}

// After answering questions, create meal, movie, and drink carousels and call functions to generate content
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
    $(".jumbotron").show();
    $(".footer").show();

})

// Function generates movie card content randomly
function generateMovie() {
    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 4; i++) {
            movieArray = response.results;
            console.log(response);

            randomMovie = Math.floor((Math.random() * movieArray.length));
            checkMovie(randomMovie);

            var movieContainer = $('#carouselMovies .carousel-inner');

            var movieCardFirst = `<div class="carousel-item active movieCard" id="movie${i}">
                                    <div class="card col-md text-center">
                                        <img class="card-img-top" id='poster' src="https://image.tmdb.org/t/p/w185${movieArray[randomMovie].poster_path}" alt="${movieArray[randomMovie].title}">
                                        <div class="card-body" id="movie-content">
                                            <h5 class="card-title" id="movie-title">${movieArray[randomMovie].title}</h5>
                                            <div class="meta">
                                                <span class="date type" alt="${movieArray[randomMovie].title}">Release Date: ${movieArray[randomMovie].release_date}<br>Rating: ${movieArray[randomMovie].vote_average}</span>
                                            </div>
                                            <p class="card-text" id="movie-description${i}">${movieArray[randomMovie].overview}<br><br>
                                            <span class="selectBtn${i}" style="color: green"></span></p>
                                        </div>
                                        <button type="button" class="select btn btn-primary btn-sm" id="select${i}">Select Movie</button>
                                    </div>
                                </div>
                                `

            var movieCard = `<div class="carousel-item movieCard" id="movie${i}">
                                <div class="card col-md text-center">
                                    <img class="card-img-top" id='poster' src="https://image.tmdb.org/t/p/w185${movieArray[randomMovie].poster_path}" alt="${movieArray[randomMovie].title}">
                                    <div class="card-body" id="movie-content">
                                        <h5 class="card-title" id="movie-title">${movieArray[randomMovie].title}</h5>
                                        <div class="meta">
                                            <span class="date type" alt="${movieArray[randomMovie].title}">Release Date: ${movieArray[randomMovie].release_date}<br>Rating: ${movieArray[randomMovie].vote_average}</span>
                                        </div>
                                        <p class="card-text" id="movie-description${i}">${movieArray[randomMovie].overview}<br><br>
                                        <span class="selectBtn${i}" style="color: green"></span></p>
                                    </div>
                                    <button type="button" class="select btn btn-primary btn-sm" id="select${i}">Select Movie</button>
                                </div>
                             </div>
                            `

            if (i == 0) {
                movieContainer.append(movieCardFirst);
            } else {
                movieContainer.append(movieCard);
            }
        }
        $(".select").on("click", function () {
            switch ($(this).attr('id')) {
                case "select0":
                    if ($('.selectBtn0').text() == '') {
                        $('.selectBtn0').append("<i class='fas fa-check'></i> Selected!");
                        $('.selectBtn1').text("");
                        $('.selectBtn2').text("");
                        $('.selectBtn3').text("");
                    } else {
                        $('.selectBtn0').text("");
                    }
                    break;

                case "select1":
                    if ($('.selectBtn1').text() == '') {
                        $('.selectBtn1').append("<i class='fas fa-check'></i> Selected!");
                        $('.selectBtn0').text("");
                        $('.selectBtn2').text("");
                        $('.selectBtn3').text("");
                    } else {
                        $('.selectBtn1').text("");
                    }
                    break;

                case "select2":
                    if ($('.selectBtn2').text() == '') {
                        $('.selectBtn2').append("<i class='fas fa-check'></i> Selected!");
                        $('.selectBtn0').text("");
                        $('.selectBtn1').text("");
                        $('.selectBtn3').text("");
                    } else {
                        $('.selectBtn2').text("");
                    }
                    break;

                case "select3":
                    if ($('.selectBtn3').text() == '') {
                        $('.selectBtn3').append("<i class='fas fa-check'></i> Selected!");
                        $('.selectBtn0').text("");
                        $('.selectBtn1').text("");
                        $('.selectBtn2').text("");
                    } else {
                        $('.selectBtn3').html("");
                    }
                    break;
            }
        })
    })
    $("#WelcomeModal").modal("hide");
}

// Appends and removes movie to the review order screen
$("body").delegate('.select', "click", function () {
    var selectedMovie = $(this)[0].offsetParent;

    if ($('#userMovieChoice')[0].innerHTML == "") {
        $(selectedMovie).clone().appendTo('#userMovieChoice')
        $('#userMovieChoice').find('i').parent().empty();
    } else {
        $('#userMovieChoice').empty();
        $(selectedMovie).clone().appendTo('#userMovieChoice')
        $('#userMovieChoice').find('i').parent().empty();
    }


});

// Function generates meal card content randomly
function generateFood() {
    $.ajax({
        url: mealQueryURL,
        method: "GET"
    }).then(function (response) {
        mealArray = response.meals;

        var foodContainer = $('#carouselMeals .carousel-inner');

        for (var i = 0; i < 4; i++) {

            randomMeal = Math.floor((Math.random() * mealArray.length));
            checkMeal(randomMeal);

            var foodCardFirst = `<div class="carousel-item foodCard active">
                                    <div class="card col-md text-center">
                                        <img class="card-img-top" src="${mealArray[randomMeal].strMealThumb}" alt="${mealArray[randomMeal].strMeal}">
                                        <div class="card-body" id="food-content">
                                            <h5 class="card-title" id="food-name">${mealArray[randomMeal].strMeal}</h5>
                                        </div>
                                        <p><span class="mealSelected${i}" style="color: green"></span></p>
                                        <button type="button" class="selectFood btn btn-primary btn-sm" id="meal${i}">Select Food</button>
                                    </div>
                                </div>
                                `
            var foodCard = ` <div class="carousel-item foodCard">
                                <div class="card col-md text-center">
                                    <img class="card-img-top" src="${mealArray[randomMeal].strMealThumb}" alt="${mealArray[randomMeal].strMeal}">
                                    <div class="card-body" id="food-content">
                                        <h5 class="card-title" id="food-name">${mealArray[randomMeal].strMeal}</h5>
                                    </div>
                                    <p><span class="mealSelected${i}" style="color: green"></span></p>
                                    <button type="button" class="selectFood btn btn-primary btn-sm" id="meal${i}">Select Food</button>
                                </div>
                            </div>
                            `

            if (i == 0) {
                foodContainer.append(foodCardFirst);
            } else {
                foodContainer.append(foodCard);
            }

        }
        $(".selectFood").on("click", function () {
            switch ($(this).attr('id')) {
                case "meal0":
                    if ($('.mealSelected0').text() == '') {
                        $('.mealSelected0').append("<i class='fas fa-check'></i> Selected!");
                        $('.mealSelected1').text("");
                        $('.mealSelected2').text("");
                        $('.mealSelected3').text("");
                    } else {
                        $('.mealSelected0').text("");
                    }
                    break;

                case "meal1":
                    if ($('.mealSelected1').text() == '') {
                        $('.mealSelected1').append("<i class='fas fa-check'></i> Selected!");
                        $('.mealSelected0').text("");
                        $('.mealSelected2').text("");
                        $('.mealSelected3').text("");
                    } else {
                        $('.mealSelected1').text("");
                    }
                    break;

                case "meal2":
                    if ($('.mealSelected2').text() == '') {
                        $('.mealSelected2').append("<i class='fas fa-check'></i> Selected!");
                        $('.mealSelected0').text("");
                        $('.mealSelected1').text("");
                        $('.mealSelected3').text("");
                    } else {
                        $('.mealSelected2').text("");
                    }
                    break;

                case "meal3":
                    if ($('.mealSelected3').text() == '') {
                        $('.mealSelected3').append("<i class='fas fa-check'></i> Selected!");
                        $('.mealSelected0').text("");
                        $('.mealSelected1').text("");
                        $('.mealSelected2').text("");
                    } else {
                        $('.mealSelected3').text("");
                    }
                    break;
            }
        })

    });

}

// Appends and removes to and from the review order modal
$("body").delegate('.selectFood', "click", function () {
    console.log($(this)[0].offsetParent);
    console.log($('#userFoodChoice')[0].innerHTML);

    var selectedFood = $(this)[0].offsetParent;

    if ($('#userFoodChoice')[0].innerHTML == "") {
        $(selectedFood).clone().appendTo('#userFoodChoice');
        $('#userFoodChoice').find('i').parent().empty();
    } else {
        $('#userFoodChoice').empty();
        $(selectedFood).clone().appendTo('#userFoodChoice');
        $('#userFoodChoice').find('i').parent().empty();
    }


});

// Function generates drink card content randomly
function generateDrink() {
    var drinkContainer = $('#carouselDrinks .carousel-inner');
    $.ajax({
        url: drinkQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        for (var i = 0; i < 4; i++) {
            var drinkIns = '';

            if (response.drinks[i].strIngredient1 != null) {
                drinksIn = response.drinks[i].strIngredient1 + "<br>";
            }

            if (response.drinks[i].strIngredient2 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient2 + "<br>";
            }

            if (response.drinks[i].strIngredient3 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient3 + "<br>";
            }

            if (response.drinks[i].strIngredient4 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient4 + "<br>";
            }

            if (response.drinks[i].strIngredient5 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient5 + "<br>";
            }

            if (response.drinks[i].strIngredient6 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient6 + "<br>";
            }

            if (response.drinks[i].strIngredient7 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient7 + "<br>";
            }

            if (response.drinks[i].strIngredient8 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient8 + "<br>";
            }

            if (response.drinks[i].strIngredient9 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient9 + "<br>";
            }

            if (response.drinks[i].strIngredient10 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient10 + "<br>";
            }

            if (response.drinks[i].strIngredient11 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient11 + "<br>";
            }

            if (response.drinks[i].strIngredient12 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient12 + "<br>";
            }

            if (response.drinks[i].strIngredient13 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient13 + "<br>";
            }

            if (response.drinks[i].strIngredient14 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient14 + "<br>";
            }

            if (response.drinks[i].strIngredient15 != null) {
                drinksIn = drinksIn + response.drinks[i].strIngredient15;
            }

            var drinkCard = `<div class="carousel-item drinkCard">
                                <div class="card col-md text-center">
                                    <img class="card-img-top" src="${response.drinks[i].strDrinkThumb}" alt="${response.drinks[i].strDrink}">
                                    <div class="card-body" id="drink-content">
                                        <h5 class="card-title" id="drink-name">${response.drinks[i].strDrink}</h5>
                                        <div class="meta">
                                            <span class="type">${response.drinks[i].strAlcoholic}</span>
                                        </div>
                                        <p class="card-text" id="drink-ingredients"> Ingredients: <br>${drinksIn}</p>
                                    </div>
                                    <p><span class="drinkSelected${i}" style="color: green"></span></p>
                                    <button type="button" class="selectDrink btn btn-primary btn-sm" id="drink${i}">Select Drink</button>  
                                </div>
                            </div>`

            var drinkCardFirst = `<div class="carousel-item active drinkCard">
                                    <div class="card col-md text-center active">
                                        <img class="card-img-top" src="${response.drinks[i].strDrinkThumb}" alt="${response.drinks[i].strDrink}">
                                        <div class="card-body" id="drink-content">
                                            <h5 class="card-title" id="drink-name">${response.drinks[i].strDrink}</h5>
                                            <div class="meta">
                                                <span class="type">${response.drinks[i].strAlcoholic}</span>
                                            </div>
                                            <p class="card-text" id="drink-ingredients"> Ingredients: <br>${drinksIn}</p>
                                        </div>
                                        <p><span class="drinkSelected${i}" style="color: green"></span></p>
                                        <button type="button" class="selectDrink btn btn-primary btn-sm" id="drink${i}">Select Drink</button>  
                                    </div>
                                </div>`

            if (i == 0) {
                drinkContainer.append(drinkCardFirst);
            } else {
                drinkContainer.append(drinkCard);
            }
        }

        $(".selectDrink").on("click", function () {
            switch ($(this).attr('id')) {
                case "drink0":
                    if ($('.drinkSelected0').text() == '') {
                        $('.drinkSelected0').append("<i class='fas fa-check'></i> Selected!");
                        $('.drinkSelected1').text("");
                        $('.drinkSelected2').text("");
                        $('.drinkSelected3').text("");
                    } else {
                        $('.drinkSelected0').text("");
                    }
                    break;

                case "drink1":
                    if ($('.drinkSelected1').text() == '') {
                        $('.drinkSelected1').append("<i class='fas fa-check'></i> Selected!");
                        $('.drinkSelected0').text("");
                        $('.drinkSelected2').text("");
                        $('.drinkSelected3').text("");
                    } else {
                        $('.drinkSelected1').text("");
                    }
                    break;

                case "drink2":
                    if ($('.drinkSelected2').text() == '') {
                        $('.drinkSelected2').append("<i class='fas fa-check'></i> Selected!");
                        $('.drinkSelected0').text("");
                        $('.drinkSelected1').text("");
                        $('.drinkSelected3').text("");
                    } else {
                        $('.drinkSelected2').text("");
                    }
                    break;

                case "drink3":
                    if ($('.drinkSelected3').text() == '') {
                        $('.drinkSelected3').append("<i class='fas fa-check'></i> Selected!");
                        $('.drinkSelected0').text("");
                        $('.drinkSelected1').text("");
                        $('.drinkSelected2').text("");
                    } else {
                        $('.drinkSelected3').text("");
                    }
                    break;
            }
        })
    });

}

// Appends and removes to and from the final review order modal
$("body").delegate('.selectDrink', "click", function () {
    console.log($(this)[0].offsetParent);
    console.log($('#userDrinkChoice')[0].innerHTML);

    var selectedDrink = $(this)[0].offsetParent;

    if ($('#userDrinkChoice')[0].innerHTML == "") {
        $(selectedDrink).clone().appendTo('#userDrinkChoice');
        $('#userDrinkChoice').find('i').parent().empty();
    } else {
        $('#userDrinkChoice').empty();
        $(selectedDrink).clone().appendTo('#userDrinkChoice');
        $('#userDrinkChoice').find('i').parent().empty();
    }


});
