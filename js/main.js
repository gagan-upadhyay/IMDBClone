const apiKey='6d04f0b5';
const searchInput=document.getElementById('movie-searchbox');
const suggestionList=document.getElementById("search-list");
const searchBtn=document.getElementById("search-btn");

searchInput.addEventListener('input', function(){
    const searchTerm=this.value.trim();
    
    if(searchTerm===''){
        suggestionList.innerHTML='';
        return;
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
        if (data.Response === 'True') {            
            Suggestionsdisplay(data.Search);            
        } 
        
        else {
            suggestionList.innerHTML = '';            
        }
    })
    .catch(error => console.error('Error fetching search results:', error));

});

function Suggestionsdisplay(suggestions){
    const maxSuggestions=5;
    if(suggestions===0){
        suggestionList.textContent="No result found";
    }
    suggestionList.innerHTML='';     

    for(let i=0;i< Math.min(suggestions.length, maxSuggestions);i++){
        const suggestion=suggestions[i];
        const suggestionLink=document.createElement('div');
        suggestionLink.classList.add('suggestionLink', 'suggestionLinkDisplay');

        // Create an image element for the poster
        const posterImg = document.createElement('img');
        
        //handling the issue if poster is a=unavailable by using a custom poster
        posterImg.src = suggestion.Poster !== 'N/A' ? suggestion.Poster : 'src/samplePoster.jpg';
        posterImg.alt = suggestion.Title;

        // Append the poster image to the suggestion link
        suggestionLink.appendChild(posterImg);
        //*************************************************************** 

        // Create a div for information for the movie title, year
    
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info'); //adding 
        
        //span for movie title
        const titleSpan=document.createElement('div');
        titleSpan.textContent = suggestion.Title;   
        titleSpan.style.paddingTop='2vh';
        infoDiv.appendChild(titleSpan);        

        // creating span for year of release
        //*****************************************************
        const yearOfRelease=document.createElement('div');
        yearOfRelease.textContent="Year of release: "+ suggestion.Year;        
        // append the year to the infoDiv
        infoDiv.appendChild(yearOfRelease);
        // ****************************************************

        //Now adding infoDiv to the suggestionLink div
        suggestionLink.appendChild(infoDiv);

        // console.log(suggestions);        

        
        // Add event listener to set the search input value when clicked
        
        
        suggestionLink.addEventListener('click', function() {
            suggestionList.innerHTML = ''; // Clear suggestions   
            const MovieDetailsObj=suggestion;
            console.log(MovieDetailsObj);
        //using local storage to store movie details object
            localStorage.setItem('movieInfo', JSON.stringify(MovieDetailsObj));
            window.location.href='movie-Information.html';

        });

        // Append the suggestion link to the suggestions container
        suggestionList.appendChild(suggestionLink);
    }

}


