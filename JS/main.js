//  & ###### HTML Elements 
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let telInput = document.getElementById("telInput")
let ageInput = document.getElementById("ageInput")
let passInput = document.getElementById("passInput")
let reInput = document.getElementById("reInput")
let submitBtn = document.getElementById("submitBtn");
let sideBar = document.getElementById("sideBar");
let toggleBtn = document.getElementById("toggleBtn");
let arrow = document.getElementById("back-to-top");



//  & ###### Variables

let nameRegex = /^[A-Za-z ]{3,15}$/;
let emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let phoneRegex = /^(02)?(01)[0125][0-9]{8}$/;
let ageRegex = /^(1[6-9]|[2-9]\d|[1-9]\d{2,})$/;
let passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

//  & ###### Functions

function validate(regex, input) {
    if (regex.test(input.value)) {
        input.nextElementSibling.classList.add("invisible");
        submitBtn.classList.remove("bg-danger");
        submitBtn.classList.add("bg-dark");
        return true;
    } else {
        input.nextElementSibling.classList.remove("invisible");
        submitBtn.classList.remove("bg-dark");
        submitBtn.classList.add("bg-danger");
        return false;
    }
}

function validateRePassword() {
    if (reInput.value === passInput.value && reInput.value !== "") {
        reInput.nextElementSibling.classList.add("invisible");
        return true;
    } else {
        reInput.nextElementSibling.classList.remove("invisible");
        return false;
    }
}

submitBtn.addEventListener("click", function () {
    if (
        validate(nameRegex, nameInput) &&
        validate(emailRegex, emailInput) &&
        validate(phoneRegex, telInput) &&
        validate(ageRegex, ageInput) &&
        validate(passRegex, passInput) &&
        validateRePassword()) {
        document.getElementById("myForm").submit();
    }
});

function checkInput() {
    return (
        nameRegex.test(nameInput.value) &&
        emailRegex.test(emailInput.value) &&
        phoneRegex.test(telInput.value) &&
        ageRegex.test(ageInput.value) &&
        passRegex.test(passInput.value) &&
        (reInput.value === passInput.value && reInput.value !== "")
    );
}

submitBtn.addEventListener("mouseenter", function () {
    if (!checkInput()) {
        submitBtn.classList.add("move-right");
    }
});

submitBtn.addEventListener("mouseleave", function () {
    submitBtn.classList.remove("move-right");
});


const apiKey = "f95133ea6fc1fc2c0fb5a3cd39acc4ca";
const baseUrl = "https://api.themoviedb.org/3";
let allMovies = [];

async function getMovies(endpoint) {
    const url = `${baseUrl}/${endpoint}?api_key=${apiKey}&language=en-US`;
    let response = await fetch(url);
    let data = await response.json();
    allMovies = data.results;
    displayMovies(allMovies);
}
function displayMovies(arr) {
    let cards = "";

    for (let [index, movie] of arr.entries()) {

        let imageSrc = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        let title = movie.title || movie.name;
        let date = movie.release_date || movie.first_air_date || "Unknown Date";
        let vote = movie.vote_average.toFixed(1);
        let stars = "";
        if (movie.title) {
            stars = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars = '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>';
        }
        cards += `
        <div class="col">
            <div class="card p-0 rounded-1 border-0">                 
                <img class="w-100 rounded-1" src="${imageSrc}" alt="${title}">
                <div class="layer">
                    <h1 class="h3 text-center">${title}</h1>                    
                    <p>${movie.overview}...</p>                    
                    <p>Release Date: ${date}</p>
                    <p class="text-warning">${stars}</p>
                    <div class="rate-box">
                        <span class="border border-2 border-success rounded-circle p-2">${vote}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("rowData").innerHTML = cards;
}
getMovies("movie/now_playing");

function searchMovies() {
    let term = document.getElementById("searchInput").value.toLowerCase();

    let matchedMovies = [];

    for (let movie of allMovies) {
        let title = movie.title || movie.name;
        if (title.toLowerCase().includes(term)) {
            matchedMovies.push(movie);
        }
    }
    displayMovies(matchedMovies);
}

toggleBtn.addEventListener("click", function () {

    sideBar.classList.toggle("open");


    if (sideBar.classList.contains("open")) {
        toggleBtn.classList.replace("fa-align-justify", "fa-xmark");
    } else {
        toggleBtn.classList.replace("fa-xmark", "fa-align-justify");
    }

});

window.onscroll = function () {
    if (window.scrollY > 200) {
        arrow.classList.remove("opacity-0");
        arrow.classList.add("opacity-100");
    } else {
        arrow.classList.remove("opacity-100");
        arrow.classList.add("opacity-0");

    }
};