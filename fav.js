
const favArray = JSON.parse(localStorage.getItem('favoriteArray'));
const favMovieElement=document.querySelector('.display-favourite-container');

const updateLocalStorage = (updatedArray) => {
    localStorage.setItem('favoriteArray', JSON.stringify(updatedArray));
};

const removeFromFavorites=(movieElement, movie)=>{
    const index =favArray.findIndex((favMovie)=>favMovie.imdbID===movie.imdbID);
    if(index!==-1){
        favArray.splice(index,1); //removing clicked movie
        updateLocalStorage(favArray); //updating local storage after removing movie
        console.log("movie " + movie.Title+ " is removed form fav");
        movieElement.remove(); //removing movieElement from UI
    }
};


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
                    <p><strong>${movie.Plot}</strong></p><br>
                    <p><strong>Cast: ${movie.Actors}</strong></p><br>
                    <p><strong>Year: ${movie.Year}</strong></p><br>
                    <p><strong>IMDb Rating: ${movie.imdbRating}</strong></p><br>
                    <p><strong>Runtime: ${movie.Runtime}</strong></p><br>                    
                </div>
            </div>            
        `;       
        
        const favbtn = movieElement.querySelector('.favbtn');
        favbtn.addEventListener('click', function(){
            removeFromFavorites(movieElement, movie);
            location.reload();
        });
        favMovieElement.appendChild(movieElement);
    });
} 
else {
        console.log('favArray is either empty or not available in local storage.');
        let movieElement = document.createElement('div');
        movieElement.classList.add('nofav');
        movieElement.innerHTML=`    
        <h3>404! No favourite Movies found!<h3>
        `
        favMovieElement.appendChild(movieElement);
    }





