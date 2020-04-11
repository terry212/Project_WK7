
//This function will generate a card to the given movie and append it to Movie display

function movieGenerator(movie){
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

