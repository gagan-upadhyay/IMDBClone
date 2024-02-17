// Retrieving movie details object from local storage
const movieInfo = JSON.parse(localStorage.getItem('movieInfo'));
document.title=movieInfo.Title +" Year:"+movieInfo.Year;
// console.log(movieInfo);
const movie=movieInfo.Title;
const Movieyear=movieInfo.Year;



async function fetchMovieDetails(movie, Movieyear) {    
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movie)}&y=${Movieyear}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();        
        
        if (response.ok) {            
            return data;
        } else {
            throw new Error(data.Error || 'Failed to fetch movie details');
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// fetching movie details:
fetchMovieDetails(movie, Movieyear)
    .then(movieDetails => {
        if (movieDetails) {
            displaysearched(movieDetails);

        } else {
            console.log('Failed to fetch movie details.');
        }
    })
    .catch(error => console.error('Error:', error.message));




// ************************display part***************************

function displaysearched(movieInfo) {    
    const titleElement=document.querySelector('#title');
    const typeElement = document.querySelector('#type');
    const genreElement = document.querySelector('#genre');
    const posterImage = document.querySelector('.search-image img');
    const displaySearchContainer=document.querySelector('.display-search-container');
    const yearElement=document.querySelector('#year');
    const plotElement=document.querySelector('#plot');
    const castElement=document.querySelector('#cast');
    const directorElement=document.querySelector('#director');
    const imdbRatingElement=document.querySelector('#imdb-rating');
    const rottentomatoesElement=document.querySelector('#rottentomatoes-rating');
    const metacriticElement=document.querySelector('#Metacritic-Rating');
    const MovieRating=movieInfo.Ratings;
    let RottenTomatoesRating='Not Available';
    let MetacriticRating='Not Available';
    // console.log(MovieRating);

    //getting ratings
    for(let i=0; i<MovieRating.length;i++){
        if(MovieRating[i].Source === 'Rotten Tomatoes') {
        RottenTomatoesRating = MovieRating[i].Value;
        // console.log(RottenTomatoesRating);
        }
        if (MovieRating[i].Source === 'Metacritic') {
            MetacriticRating = MovieRating[i].Value;                

        }
    }
    //*****************************************************
    //replacing elements with details.
    titleElement.textContent = `${movieInfo.Title}`;
    typeElement.textContent = `Type: ${movieInfo.Type}`;
    genreElement.textContent = `Genre: ${movieInfo.Genre}`;
    yearElement.textContent = `Year: ${movieInfo.Year}`;
    plotElement.textContent = `Plot: ${movieInfo.Plot}`;
    castElement.textContent = `Cast: ${movieInfo.Actors}`;
    directorElement.textContent = `Director: ${movieInfo.Director}`;
    imdbRatingElement.textContent = `IMDb Ratings: ${movieInfo.imdbRating}`;
    rottentomatoesElement.textContent = `Rotten-Tomatoes Ratings: ${RottenTomatoesRating}`;
    metacriticElement.textContent = `Metacritics Ratings: ${MetacriticRating}`;

        //if movie poster is not available a predefined poster is used.


    posterImage.src = movieInfo.Poster !== 'N/A' ? movieInfo.Poster : 'src/samplePoster.jpg';
    posterImage.alt = movieInfo.Title;


    displaySearchContainer.style.display='flex';// to show the details        

    //*************************************************************************
    // favourite button portion, add or remove movie from favourites.
    const favBtn=document.querySelector('.fav-btn');
    let favourites=JSON.parse(localStorage.getItem('favoriteArray')); //initialize favoriteArray in local storage.

    if (!Array.isArray(favourites)) {
        favourites = []; // Initialize as an empty array if null or not an array
    }

    const index = favourites.findIndex(movie => JSON.stringify(movie) === JSON.stringify(movieInfo));

    if (index !== -1) { //check if the movie is in favoriteArray, if yes, change favorite btn
        // Movie is in favoriteArray, so change the favorite btn
        favBtn.classList.add('fa-solid');
        favBtn.classList.remove('fa-regular');
    }



    favBtn.addEventListener('click', function(){        
        // let favourites=JSON.parse(localStorage.getItem('favoriteArray'));
                
        //check if the favorite arraay is empty or not
        if(favourites.length===0){
            favourites.push(movieInfo);
            console.log("Movie "+ movieInfo.Title + " is added to favorites");
            favBtn.classList.remove('fa-regular');
            favBtn.classList.add('fa-solid');          
        }else{
            // Check if movieInfo is already in favoriteArray
            const index = favourites.findIndex(movie => JSON.stringify(movie) === JSON.stringify(movieInfo));

            if (index === -1) {
            // Movie is not in favoriteArray, so add it
            favourites.push(movieInfo);
            console.log("Movie "+ movieInfo.Title + " is added to favorites");
            favBtn.classList.remove('fa-regular');
            favBtn.classList.add('fa-solid');
            }else {
            // Movie is already in favoriteArray, so remove it
            
            favourites.splice(index, 1);
            console.log("Movie "+ movieInfo.Title + " removed to favorites");
            favBtn.classList.remove('fa-solid');
            favBtn.classList.add('fa-regular');
                }
        }
        // Update favoriteArray in local storage
        localStorage.setItem('favoriteArray', JSON.stringify(favourites));
        
    });    
} //**********************end of displayedSearched function************

