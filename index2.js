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

  // Parcourir la liste des recettes
  for (let i = 0; i < recipes.length; i++) {
    // Récupérer la recette courante
    let recipe = recipes[i];

    // Créer un élément pour la carte
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

// Fonction de gestion de la recherche
const handleSearch = (searchTerm) => {
  // Créer un tableau pour les recettes filtrées
  const filteredRecipes = [];

  // Afficher le terme de recherche dans la console
  console.log("Terme de recherche :", searchTerm);

  // Vérifier si le terme de recherche est vide ou inférieur à 3 caractères
  if (searchTerm === "" || searchTerm.length < 3) {
    // Si le terme de recherche est vide ou inférieur à 3 caractères, afficher toutes les recettes
    displayCards(recipes);
  } else {
    // Si le terme de recherche n'est pas vide et qu'il contient au moins 3 caractères, filtrer les recettes
    for (let i = 0; i < recipes.length; i++) {
      // Récupérer la recette courante
      const recipe = recipes[i];

      // Vérifier si le terme de recherche est contenu dans le nom, les ingrédients ou la description de la recette
      if (
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.every((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        ) ||
        recipe.description.toLowerCase().includes(searchTerm)
      ) {
        // Si le terme de recherche est contenu dans la recette, l'ajouter au tableau des recettes filtrées
        filteredRecipes.push(recipe);
      }
    }
  }

  // Afficher les recettes filtrées
  displayCards(filteredRecipes);

  // Afficher le nombre de recettes filtrées dans la console
  console.log(filteredRecipes);

  // Afficher le nombre de recettes filtrées dans le DOM
  numberRecipes(filteredRecipes);
};

// Fonction pour afficher un message d'absence de résultat
const displayNoResult = (term) => {
  // Vider l'élément des cartes
  cartes.innerHTML = "";

  // Créer un élément pour le message d'absence de résultat
  const noResultMsg = document.createElement("p");
  // Ajouter la classe "no-result" à l'élément
  noResultMsg.classList.add("no-result");

  // Styliser l'élément
  noResultMsg.style.color = "black";
  noResultMsg.style.textAlign = "center";
  noResultMsg.style.fontSize = "28px";
  noResultMsg.style.lineHeight = "1.5";
  noResultMsg.style.padding = "20px";

  // Ajouter le texte du message d'absence de résultat
  noResultMsg.textContent = `Aucune recette ne contient "${term}". Vous pouvez essayer avec d'autres termes comme "tarte aux pommes", "poisson", etc.`;

  // Ajouter l'élément du message d'absence de résultat à l'élément des cartes
  cartes.appendChild(noResultMsg);
};

// Écouter l'événement "input" sur le champ de recherche
inputSearch.addEventListener("input", (event) => {
  // Récupérer la valeur du champ de recherche
  const searchTerm = event.target.value;

  // Afficher la valeur du champ de recherche dans la console
  console.log("Valeur du champ de recherche :", searchTerm);

  // Vérifier si le terme de recherche contient au moins 3 caractères
  if (searchTerm.length >= 3) {
    // Si le terme de recherche contient au moins 3 caractères, effectuer la recherche
    handleSearch(searchTerm);
  } else {
    // Si le terme de recherche ne contient pas au moins 3 caractères, afficher un message d'absence de résultat
    displayNoResult(searchTerm);
  }
});

// Afficher le nombre de recettes dans le DOM
const numberRecipes = (recipes) => {
  // Récupérer l'élément pour le nombre de recettes
  const numberRecipesElement = document.querySelector(".nbrRecipes");

  // Afficher le nombre de recettes dans l'élément
  numberRecipesElement.textContent = `${recipes.length} recettes`;
};

// Afficher le nombre de recettes initial dans le DOM
numberRecipes(recipes);

// /////////////////////////////////////////////////////////////////////////////::


