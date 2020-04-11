$('.special.cards .image').dimmer({
    on: 'hover'
  });


//This function will generate a card to the given movie and append it to Movie display

function movieGenerator(movie){
    $("#movieDisplay").append(`
    <div class="ui special cards" id="movieCard">
        <div class="card">
          <div class="blurring dimmable image">
            <div class="ui dimmer">
              <div class="content">
                <div class="center">
                  <div class="ui inverted button">Select Movie</div>
                </div>
              </div>
            </div>
            <img src="Assets/Images/sample_image.jpg">
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
    `)
}

//we can create a for loop on movies like for(movie){}

