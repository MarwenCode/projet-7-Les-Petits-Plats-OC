import recipes from "./data/recipes.js";


// Select the input element with the class "searchInput"
const inputSearch = document.querySelector(".searchInput input");


// create cartes
const cartes = document.querySelector(".cartes");

const displayCartes = (recipes) => {
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    let carte = document.createElement("article");
    carte.classList.add("carte");

    // Assuming 'ingredients' is an array in each recipe
    let listeIngredients = "";
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      // Check if quantity and unit are present, otherwise, display an empty string
      const quantity = ingredient.quantity
        ? `<p>${ingredient.quantity}</p>`
        : "";
      const unit = ingredient.unit ? `<span>${ingredient.unit}</span>` : "";
      listeIngredients += 
      `<div class="ingredients-info">
      <div class="title">
      <p>${ingredient.ingredient}</p>
      </div>
      <div class="unit">
      <p>${quantity}</p>
    <span>${unit}</span>
  </div>


    </div>`;
    }
    carte.innerHTML = `
      <div class="carte_image">
        <img
          src="photos/${recipe.image}"
          class="card-img-top"
          alt="Illustration plat"
        />
      </div>
      <div class="title">
        <h2>${recipe.name}</h2>
      </div>
      <div class="time">
        <p>${recipe.time} min</p>
      </div>
      <div class="description-section">
        <p class="description">${recipe.description}</p>
      </div>
      <div class="ingredients-section">
        <p>Ingrédients</p>
        <div class="ingredients">
          ${listeIngredients}
        </div>
      </div>
    `;

    cartes.append(carte);
  }
};

displayCartes(recipes);

console.log(recipes)

//search with title/ingredients/ description




// Select the input element with the class "searchInput"




// Select the magnifying glass element
const searchLoup = document.querySelector(".searchLoup");

const searchRecip = () => {
  const searchTerm = inputSearch.value.toLowerCase();
  console.log('Search Term:', searchTerm);

  const filterArray = recipes.filter((recette) => {
    return recette.name.toLowerCase().includes(searchTerm);
  });
  console.log('Filtered Array:', filterArray);

  cartes.innerHTML ="";

  displayCartes(filterArray);
};



// Add a click event listener to the magnifying glass element
searchLoup.addEventListener('click', searchRecip);






// inputSearch.value.toLowerCase();
// const filterArray = recipes.filter((recette) => {
//   return recette.name.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
//   recette.ingredients.some((ingre) => ingre.ingredient.toLowerCase()
//   .includes(inputSearch.value.toLowerCase())) ||
//   recette.description.toLowerCase().includes(inputSearch.value.toLowerCase());
//   });
