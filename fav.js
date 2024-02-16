
const favArray = JSON.parse(localStorage.getItem('favoriteArray'));
const favMovieElement=document.querySelector('.display-favourite-container');

// Step 3: Loop through the array and access each object
if (favArray && favArray.length > 0) {    
    favArray.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-container');

        movieElement.innerHTML = `            
            <div class='poster-image'>
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'samplePoster.jpg'}" alt="Movie Poster"> 
                
            </div>            
            <div class='movie-info'>
            <div>
                <i class="fa-solid favbtn fa-heart"></i>
                <p id="cast"><strong>Cast: ${movie.Actors}</strong></p><br>
                <p id="year"><strong>Year: ${movie.Year}</strong></p><br>
                <p id="imdb-rating">IMDb Rating: ${movie.imdbRating}</p><br>
            </div>
            </div>
            
        `;
        
        favMovieElement.appendChild(movieElement);
    });
} else {
    console.log('favArray is either empty or not available in local storage.');
}


// *********Handling the fav btn on the favourite screen************

const fbtn=document.querySelector('.favbtn');

document.querySelector('.movie-info').onmouseover=function(){
    
}






fbtn.addEventListener('click', function(){
    
    let favourites=JSON.parse(localStorage.getItem('favoriteArray'));
    // const selectedMovie=movie.Title;
    // console.log(selectedMovie);

    const index = favourites.findIndex(movie => JSON.stringify(movie) === JSON.stringify(movieInfo));
    favArray.splice(index, 1);
    console.log("Movie "+ movieInfo.Title + " removed to favorites");    

});

