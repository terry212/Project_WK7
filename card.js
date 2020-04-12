
//This function will generate a card to the given movie and append it to Movie display

function moviecardGenerator(movie) {
    $("#movieDisplay").append(`
    <div class="ui special link cards" id="movieCard">
    <div class="card">
        <div class="image" id="movieposter">
            <img>${movie.poster_path}</img>
        </div>
        <div class="content" id="movie-content">
            <a class="header" id="movie-title">${movie.title}</a>
            <div class="meta">
                <span class="date">Release Date: ${movie.release_date}</span>
            </div>
            <div class="description" id="movie-description">${movie.overview}</div>
        </div>
        <div class="extra content">
            <p>Rating: ${movie.vote_average}<p>
        </div>
    </div>
</div>
    `)
}

//we can create a for loop on movies like for(movie){}

//This function will generate a card to the given drink and append it to drink display

function drinkcardGenerator(drink) {
    $("#drinkDisplay").append(`
    <div class="ui special link cards" id="drinkCard">
        <div class="card">
            <div class="image" id="drinkImage">
                <img>${drink.strDrinkThumb}<img/>
            </div>
            <div class="content" id="drink-content">
                <a class="header" id="drink-name">${drink.strDrink}</a>
                <div class="meta">
                    <span class="type">${drink.strAlcoholic}</span>
                </div>
                <div class="description" id="drink-ingredients">
                    ${drink.strIngredient1},${drink.strIngredient2},${drink.strIngredient3},${drink.strIngredient4},${drink.strIngredient5}
                </div>
            </div>
        </div>
    </div>
    
    `)
}

//we can create a for loop on drinks, like for(drink){}

//This function will generate a card to the given food and append it to food display

function foodCardGenerator(food){
    $("#foodDisplay").append(`
    <div class="ui special link cards" id="foodCard">
    <div class="card">
        <div class="image" id="foodImage">
            <img>${food.strMealThumb}<img/>
        </div>
        <div class="content" id="food-content">
            <a class="header" id="food-name">${food.strMeal}</a>
        </div>
    </div>
</div>
    `)
}

//we can create a for loop on food, like for(food){}

