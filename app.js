const container = document.getElementById("containerCoctel");
const search = document.getElementById("search");
const api = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

search.addEventListener("keyup",finderCoctel);
window.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
    for (let i = 0; i < 12; i++) {
        fetch(api)
        .then(response => response.json())
        .then(data => renderCard(data));
    }
}

function renderCard(data) {
    data["drinks"].map(drink =>{

        const cardCoctel = document.createElement("div");
        cardCoctel.classList.add("cardCoctel");

        const information = document.createElement("div");
        information.classList.add("information")

        const image = document.createElement("img");
        image.src = drink["strDrinkThumb"];
        image.classList.add('image');
        
        const nameCoctel = document.createElement("h2");
        nameCoctel.textContent = drink["strDrink"];
        nameCoctel.classList.add('nameCoctel');

        const ingredients = document.createElement("p");
        ingredients.textContent = `${drink["strIngredient1"]}, ${drink["strIngredient2"]}, ${drink["strIngredient3"]}.`
        ingredients.classList.add('ingredients');

        const iconCoctel = document.createElement('i');
        iconCoctel.classList.add('icon-cocktail-mojito-streamline');


        cardCoctel.appendChild(image);
        cardCoctel.appendChild(information);
        information.appendChild(iconCoctel)
        information.appendChild(nameCoctel);
        information.appendChild(ingredients);

        container.appendChild(cardCoctel);
    })
}

function finderCoctel(event) {
    container.innerHTML=" ";
    let newApi = ' ';

    if (event.target.value === '') {
        fetchData()
    }else{
        newApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${event.target.value}`;
    }
    fetch(newApi)
    .then(response => response.json())
    .then(data => renderCard(data));

}