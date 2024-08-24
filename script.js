// Initial references

let movieNameRef = document.getElementById('movie-name');
let searchBtn = document.getElementById('searchBtn');
let result = document.getElementById('result');


// Functions to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value.trim(); // Trim spaces
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // If input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h4 class="msg">Please enter a movie name</h4>`;
    } else {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                // If movie exists in the database
                if (data.Response === "True") {
                    result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster}" class="poster" alt="Movie Poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.jpg" alt="Rating Icon">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    `;
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(error => {
                result.innerHTML = `<h3 class="msg">An error occurred: ${error.message}</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie)
window.addEventListener("load", getMovie);