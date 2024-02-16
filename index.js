import recipes from "./data/recipes.js";

// Sélectionner  la classe "searchInput"
const inputSearch = document.querySelector(".searchInput input");

// Créer des cartes
const cartes = document.querySelector(".cartes");
// Sélectionner les conteneurs de tags
const tagsContainer = document.querySelector(".tags-container");

// Fonction pour afficher les cartes
const displayCards = (recipes) => {
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    let carte = document.createElement("article");
    carte.classList.add("carte");
    carte.recipe = recipe;

    let listeIngredients = "";
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];

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

    cartes.append(carte);
  }
};

displayCards(recipes);

console.log(recipes.length);

// Sélectionner l'icône de la loupe
const searchLoup = document.querySelector(".searchLoup");

const displayNoResult = (term) => {
  const noResultMsg = document.createElement("p");
  noResultMsg.classList.add("no-result");

  noResultMsg.style.color = "black";
  noResultMsg.style.textAlign = "center";
  noResultMsg.style.fontSize = "28px";
  noResultMsg.style.lineHeight = "1.5";
  noResultMsg.style.padding = "20px";

  noResultMsg.textContent = `Aucune recette ne contient "${term}". Vous pouvez essayer avec d'autres termes comme "tarte aux pommes", "poisson", etc.`;

  cartes.appendChild(noResultMsg);
};

// Filtrer la recherche principale

const filterRecipes = (searchTerm, recipes) => {
  return recipes.filter((recipe) => {
    const matchesSearch =
      searchTerm.length >= 3 &&
      (recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.every((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        ) ||
        recipe.description.toLowerCase().includes(searchTerm));

        return matchesSearch;
  });
};

// Gérer la recherche principale

const handleSearch = (searchTerm) => {
  const filteredRecipes = filterRecipes(searchTerm, recipes);
  console.log(filteredRecipes);
  cartes.innerHTML = "";

  if (filteredRecipes.length > 0) {
    displayCards(filteredRecipes);
  } else {
    displayNoResult(searchTerm);
  }

  // Mettre à jour le nombre de recettes affichées
  numberRecipes(filteredRecipes);
};

// Recherche de recettes

const searchRecipes = () => {
  const searchTerm = inputSearch.value.toLowerCase().trim();
  handleSearch(searchTerm);
};

// Ajouter des écouteurs d'événements pour le clic et l'entrée
searchLoup.addEventListener("click", searchRecipes);
inputSearch.addEventListener("input", searchRecipes);

// Afficher le nombre de recettes

const numberRecipes = (recipes) => {
  const numberRecipesElement = document.querySelector(".nbrRecipes");
  numberRecipesElement.textContent = `${recipes.length} recettes`;
};

numberRecipes(recipes);

// ////////////////////////////////////:Recherche secondaire/////////////////////////////////////////::

// Filtrer les ingrédients uniques
const uniqueIngredients = [
  ...new Set(
    recipes.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    )
  ),
];
console.log(uniqueIngredients);

const searchBarIngredients = document.querySelector(".searchBar-ingredient");
const listeIngredients = document.querySelector(".liste-ingredient");
const inputIngredients = document.querySelector(".inputIngredients");
const toggleArrowIngre = document.querySelector(".arrow-ingre");
const btnSectionIngre = document.querySelector(".btn-section-ingre");

const originalLiIngredients = [];

// Basculer la visibilité de la liste des ingrédients lorsque le bouton est cliqué
btnSectionIngre.addEventListener("click", () => {
  // Afficher la liste des ingrédients
  searchBarIngredients.classList.toggle("hidden");
  toggleArrowIngre.classList.toggle("fa-chevron-down");
  toggleArrowIngre.classList.toggle("fa-chevron-up");

  // Si la liste n'est pas déjà remplie, afficher tous les ingrédients
  if (originalLiIngredients.length === 0) {
    displayListSecondaireIngredients(uniqueIngredients);
  }
});

// Afficher la liste des ingrédients sur l'entrée
inputIngredients.addEventListener("input", () => {
  const value = inputIngredients.value.toLowerCase().trim();

  // Effacer le contenu de la `<ul>`
  listeIngredients.innerHTML = "";

  const filteredIngredients = uniqueIngredients.filter((ingredient) => {
    return ingredient.toLowerCase().includes(value);
  });

  // Effacer la `<ul>` element
  listeIngredients.innerHTML = "";

  if (filteredIngredients.length > 0) {
    displayListSecondaireIngredients(filteredIngredients);
  } else {
    const li = document.createElement("li");
    li.textContent = "Aucun résultat trouvé.";
    listeIngredients.appendChild(li);
  }
  console.log(uniqueIngredients);
  console.log(filteredIngredients);
});

const displayListSecondaireIngredients = (ingredients) => {
  ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    li.addEventListener("click", () => createTag(ingredient, "ingredients"));
    listeIngredients.appendChild(li);
    originalLiIngredients.push(li);
  });
};

// Filtrer les appareils uniques///////////////////////////////////////////////:

const uniqueAppliances = [
  ...new Set(recipes.map((recipe) => recipe.appliance)),
];
const showSearchSecAppBtn = document.querySelector(".showSearchSecAppareil");
const searchBarAppareil = document.querySelector(".searchBar-appareil");
const btnSectionApp = document.querySelector(".btn-section-app");
const listeAppareil = document.querySelector(".liste-appareil");
const inputAppareil = document.querySelector(".inputAppareil");

const toggleArrowApp = document.querySelector(".arrow-app");

const originalLiAppliance = [];

console.log(listeAppareil);
console.log(uniqueAppliances);

btnSectionApp.addEventListener("click", () => {
  searchBarAppareil.classList.toggle("hidden");
  toggleArrowApp.classList.toggle("fa-chevron-down");
  toggleArrowApp.classList.toggle("fa-chevron-up");

  // Si la liste n'est pas déjà remplie, afficher tous les appareils
  if (originalLiAppliance.length === 0) {
    displayListSecondaireAppareil(uniqueAppliances);
  }
});

inputAppareil.addEventListener("input", () => {
  const value = inputAppareil.value.toLowerCase().trim();

  // Effacer le contenu existant
  listeAppareil.innerHTML = "";

  // Filtrer les appareils
  const filteredAppliances = uniqueAppliances.filter((appliance) => {
    return appliance.toLowerCase().includes(value);
  });

  // Afficher les appareils filtrés ou le message d'aucun résultat
  if (filteredAppliances.length > 0) {
    displayListSecondaireAppareil(filteredAppliances);
  } else {
    listeAppareil.textContent = "Aucun résultat trouvé.";
  }
});

const displayListSecondaireAppareil = (appliances) => {
  appliances.forEach((appliance) => {
    const li = document.createElement("li");
    li.textContent = appliance;
    li.addEventListener("click", () => createTag(appliance, "appliance"));
    listeAppareil.appendChild(li);
    originalLiAppliance.push(li);
  });
};

console.log(originalLiAppliance);

// Filtrer les ustensiles uniques//////////////////////////////////////////:

const uniqueUstensiles = [
  ...new Set(recipes.map((recipe) => recipe.ustensils).flat()),
];
console.log(uniqueUstensiles);

const showSearchSecUsentBtn = document.querySelector(
  ".showSearchSecUstensiles"
);
const inputUstensiles = document.querySelector(".inputUstensiles");
const listeUstensiles = document.querySelector(".liste-ustensiles");
const btnSectionUstensiles = document.querySelector(".btn-section-ustensiles");
const searchBarUstensiles = document.querySelector(".searchBar-ustensiles ");
const originalLiElementsUstensiles = [];

btnSectionUstensiles.addEventListener("click", () => {
  searchBarUstensiles.classList.toggle("hidden");
  toggleArrowApp.classList.toggle("fa-chevron-down");
  toggleArrowApp.classList.toggle("fa-chevron-up");

  // Si la liste n'est pas déjà remplie, afficher tous les ustensiles
  if (originalLiElementsUstensiles.length === 0) {
    displayListSecondaireUstensiles(uniqueUstensiles);
  }
});

inputUstensiles.addEventListener("input", () => {
  const value = inputUstensiles.value.toLowerCase().trim();

  // Effacer le contenu existant
  listeUstensiles.innerHTML = "";

  // Filtrer les ustensiles
  const filteredUstensiles = uniqueUstensiles.filter((ustensile) => {
    return ustensile.toLowerCase().includes(value);
  });

  // Afficher les ustensiles filtrés ou le message d'aucun résultat
  if (filteredUstensiles.length > 0) {
    displayListSecondaireUstensiles(filteredUstensiles);
  } else {
    listeUstensiles.textContent = "Aucun résultat trouvé.";
  }
});

const displayListSecondaireUstensiles = (ustensiles) => {
  ustensiles.forEach((ustensile) => {
    const li = document.createElement("li");
    li.textContent = ustensile;
    li.addEventListener("click", () => createTag(ustensile, "ustensiles"));
    listeUstensiles.appendChild(li);
    originalLiElementsUstensiles.push(li);
  });
};

// Ajouter un gestionnaire d'événements pour la suppression du tag
tagsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-times")) {
    const tag = event.target.parentElement.previousElementSibling;

    // Retirer le tag et le bouton de suppression
    tag.remove();
    event.target.parentElement.remove();

    // S'il reste des tags, filtrer et afficher les recettes en fonction d'eux
    // S'il ne reste qu'un seul tag, afficher toutes les recettes
    const remainingTags = tagsContainer.querySelectorAll(".tag");
    if (remainingTags.length > 0) {
      const filteredRecipes = filterWithAllTagsOnly();
      cartes.innerHTML = "";
      displayCards(filteredRecipes);
    } else {
      cartes.innerHTML = "";
      displayCards(recipes);
      numberRecipes(recipes);
    }
  }
});

// Créer des tags

// Fonction pour créer les éléments des tags
const createTagElement = (tagContent) => {
  const tag = document.createElement("span");
  tag.textContent = tagContent;
  tag.style.display = "inline-flex";
  tag.style.padding = "17px 18px";
  tag.style.alignItems = "center";
  tag.style.gap = "60px";
  tag.style.marginLeft = "10px";
  tag.style.marginRight = "15px";
  tag.style.borderRadius = "10px";
  tag.style.background = "#FFD15B";
  tag.style.width = "10%";
  tag.classList.add("tag");
  return tag;
};

// Fonction pour créer les boutons de suppression
const createDeleteButton = () => {
  const deleteTag = document.createElement("span");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-times");
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.marginLeft = "-30px";
  deleteTag.appendChild(deleteIcon);
  return deleteTag;
};

// Fonction pour créer des tags

// Fonction pour créer des tags
const createTag = (tagContent, filterProperty) => {
  const tag = createTagElement(tagContent);
  const deleteTag = createDeleteButton();
  tagsContainer.appendChild(tag);
  tagsContainer.appendChild(deleteTag);

  // Vérifier si la barre de recherche est vide
  if (inputSearch.value === "") {
    // Obtenir les recettes filtrées à partir des tags
    const filteredRecipesWithTags = filterWithAllTagsOnly(filterProperty);

    // Afficher les résultats filtrés
    cartes.innerHTML = "";
    displayCards(filteredRecipesWithTags);
  } else {
    // Obtenir les recettes filtrées à partir de la barre de recherche
    const filteredRecipesWithSearchBar = filterRecipes(
      inputSearch.value,
      recipes
    );

    // Obtenir les recettes filtrées à partir des tags
    const filteredRecipesWithTags = filterWithAllTagsOnly(filterProperty);

    // Combiner les résultats filtrés
    const combinedResults = [
      ...filteredRecipesWithSearchBar,
      ...filteredRecipesWithTags,
    ];

    // Afficher les résultats combinés
    cartes.innerHTML = "";
    displayCards(combinedResults);
    numberRecipes(combinedResults);
  }

  // Effacer les champs de saisie
  inputIngredients.value = "";
  inputAppareil.value = "";
};

// Si aucune recherche n'est effectuée dans la barre de recherche et les tags sont encore vides
// Fonction pour filtrer les recettes avec tous les tags uniquement
const filterWithAllTagsOnly = (filterProperty) => {
  console.log("Filtrage avec tous les tags...");
  // Obtenir tous les tags sélectionnés
  const selectedTags = Array.from(document.querySelectorAll(".tag")).map(
    (tag) => tag.textContent.toLowerCase()
  );

  // Créer des tableaux pour stocker les recettes filtrées pour chaque catégorie
  const recipesFilteredByIngredient = [];
  const recipesFilteredByAppliance = [];
  const recipesFilteredByUstensil = [];

  // Filtrer les recettes en fonction des tags sélectionnés
  recipes.forEach((recipe) => {
    const ingredientTags = recipe.ingredients.map((item) =>
      item.ingredient.toLowerCase()
    );

    const ustensileTags = recipe.ustensils.map((item) => item.toLowerCase());

    const applianceTag = recipe.appliance.toLowerCase();

    const ingredientTagMatch = selectedTags.every((tag) =>
      ingredientTags.includes(tag)
    );

    const ustensileTagMatch = selectedTags.every((tag) =>
      ustensileTags.includes(tag)
    );

    const applianceTagMatch = selectedTags.includes(applianceTag);

    if (ingredientTagMatch) {
      recipesFilteredByIngredient.push(recipe);
    }
    if (ustensileTagMatch) {
      recipesFilteredByUstensil.push(recipe);
    }
    if (applianceTagMatch) {
      recipesFilteredByAppliance.push(recipe);
    }
  });

  // Combiner les recettes filtrées de différentes catégories en fonction de filterProperty
  let combinedRecipes = [];
  switch (filterProperty) {
    case "ingredients":
      combinedRecipes = [...recipesFilteredByIngredient];
      break;
    case "appliance":
      combinedRecipes = [...recipesFilteredByAppliance];
      break;
    case "ustensiles":
      combinedRecipes = [...recipesFilteredByUstensil];
      break;
    default:
      combinedRecipes = [
        ...recipesFilteredByIngredient,
        ...recipesFilteredByAppliance,
        ...recipesFilteredByUstensil,
      ];
  }

  // Obtenir les recettes uniques à partir des recettes combinées
  const uniqueRecipes = [...new Set(combinedRecipes)];

  numberRecipes(uniqueRecipes);

  // Retourner les recettes uniques
  return uniqueRecipes;
};