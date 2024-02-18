// Importer les recettes depuis le fichier data/recipes.js
import recipes from "./data/recipes.js";

// Sélectionner l'élément avec la classe "searchInput"
const inputSearch = document.querySelector(".searchInput input");

// Créer un élément pour les cartes
const cartes = document.querySelector(".cartes");

// Fonction pour afficher les cartes
const displayCards = (recipes) => {
  // Vider l'élément des cartes
  cartes.innerHTML = "";


  for (let i = 0; i < recipes.length; i++) {
  
    let recipe = recipes[i];

 
    let carte = document.createElement("article");
    // Ajouter la classe "carte" à l'élément
    carte.classList.add("carte");
    // Stocker la recette dans l'élément
    carte.recipe = recipe;

    // Créer une liste d'ingrédients
    let listeIngredients = "";

    // Parcourir la liste des ingrédients
    for (let j = 0; j < recipe.ingredients.length; j++) {
      // Récupérer l'ingrédient courant
      const ingredient = recipe.ingredients[j];

      // Créer un élément pour l'ingrédient
      const quantity = ingredient.quantity
        ? `<p>${ingredient.quantity}</p>`
        : "";
      const unit = ingredient.unit ? `<span>${ingredient.unit}</span>` : "";
      listeIngredients += `<div class="ingredients-info">
        <div class="title">
          <p>${ingredient.ingredient}</p>
        </div>
        <div class="unit">
          <p>${quantity}</p>
          <span>${unit}</span>
        </div>
      </div>`;
    }

    // Ajouter le contenu HTML à la carte
    carte.innerHTML = `
      <div class="carte_image">
        <img
          src="photos/${recipe.image}"
          class="card-img-top"
          alt="Illustration plat"
        />
      </div>
      <div class="time">
      <p>${recipe.time} min</p>
       </div>
      <div class="text">
        <div class="title">
          <h2>${recipe.name}</h2>
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
      </div>
    `;

    // Ajouter la carte à l'élément des cartes
    cartes.append(carte);
  }
};

// Si le champ de recherche est vide, afficher toutes les recettes
if (inputSearch.value === "") {
  displayCards(recipes);
}

// Afficher le nombre de recettes
console.log(recipes.length);



const handleSearch = (searchTerm) => {
  const filteredRecipes = [];

  // Si le terme de recherche est vide, afficher toutes les recettes par défaut
  if (searchTerm.length < 3) {
    displayCards(recipes);

    // Mettre à jour le nombre de recettes affichées
    numberRecipes(recipes);

    return;
  }

  // Recherche dans les recettes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const secondSearchTerm = searchTerm.toLowerCase();

    // Recherche dans le nom de la recette
    if (recipe.name.toLowerCase().includes(secondSearchTerm)) {
      filteredRecipes.push(recipe);
      continue;
    }

    // Recherche dans la description de la recette
    if (recipe.description.toLowerCase().includes(secondSearchTerm)) {
      filteredRecipes.push(recipe);
      continue;
    }

    // Recherche dans les ingrédients de la recette
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
      if (ingredient.includes(secondSearchTerm)) {
        filteredRecipes.push(recipe);
        break;
      }
    }
  }

  // Afficher les recettes filtrées ou le message d'erreur
  if (filteredRecipes.length > 0) {
    displayCards(filteredRecipes);
  } else {
    displayNoResult(searchTerm);
  }

  // Mettre à jour le nombre de recettes affichées
  numberRecipes(filteredRecipes);
};


const displayNoResult = (term) => {
  // Vider l'élément des cartes
  cartes.innerHTML = "";

  // Créer un élément pour le message d'absence de résultat
  const noResultMsg = document.createElement("p");
  // Ajouter la classe "no-result" à l'élément
  noResultMsg.classList.add("no-result");

  noResultMsg.style.color = "black";
  noResultMsg.style.textAlign = "center";
  noResultMsg.style.fontSize = "28px";
  noResultMsg.style.lineHeight = "1.5";
  noResultMsg.style.padding = "20px";

  noResultMsg.textContent = `Aucune recette ne contient "${term}". Vous pouvez essayer avec d'autres termes comme "tarte aux pommes", "poisson", etc.`;

  cartes.appendChild(noResultMsg);
};

inputSearch.addEventListener("input", (event) => {
  const searchTerm = event.target.value;

  console.log("Valeur du champ de recherche :", searchTerm);

  if (searchTerm.length >= 3) {
    handleSearch(searchTerm);
  } else if (searchTerm.length === 0) {
    displayCards(recipes);

    numberRecipes(recipes);
  } else {
    displayNoResult(searchTerm);
    numberRecipes([]);
  }
});

// Afficher le nombre de recettes 
const numberRecipes = (recipes) => {
  // Récupérer l'élément pour le nombre de recettes
  const numberRecipesElement = document.querySelector(".nbrRecipes");

  // Afficher le nombre de recettes 
  numberRecipesElement.textContent = `${recipes.length} recettes`;
};

// Afficher le nombre de recettes initial 
numberRecipes(recipes);

// /////////////////////////////////////////////////////////////////////////////::
