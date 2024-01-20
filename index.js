import recipes from "./data/recipes.js";

// Select the input element with the class "searchInput"
const inputSearch = document.querySelector(".searchInput input");

// create cartes
const cartes = document.querySelector(".cartes");

const tagsContainer = document.querySelector(".tags-container");

const displayCartes = (recipes) => {
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
      <div class="text">
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
      </div>
    `;

    cartes.append(carte);
  }
};

displayCartes(recipes);

console.log(recipes);

//search with title/ingredients/ description

// Select the magnifying glass element
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
  // document.body.append(cartes);
};

const searchRecipes = () => {
  const searchTerm = inputSearch.value.toLowerCase().trim();
  const selectedTags = Array.from(tagsContainer.querySelectorAll(".tag")).map(
    (tag) => tag.textContent.toLowerCase()
  );

  console.log("Search Term:", searchTerm);
  console.log("Selected Tags:", selectedTags);

  const filterArray = recipes.filter((recette) => {
    const matchesSearch =
      searchTerm.length >= 3 && (
        recette.name.toLowerCase().includes(searchTerm) ||
        recette.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        ) ||
        recette.description.toLowerCase().includes(searchTerm)
      );
  
    // const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => recette.tags.includes(tag));
  
    return matchesSearch ;
  });

  console.log("Filtered Array:", filterArray);

  cartes.innerHTML = "";

  if (filterArray.length > 0) {
    displayCartes(filterArray);
  } else {
    displayNoResult(searchTerm);
  }
};

// Add a click event listener to the magnifying glass element
searchLoup.addEventListener("click", searchRecipes);
inputSearch.addEventListener("input", searchRecipes);

//recherche secondaire//

//filter Ingredients
const uniqueIngredients = [
  ...new Set(
    recipes.flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    )
  ),
];
console.log(uniqueIngredients);
const showSearchSecIngreBtn = document.querySelector(
  ".showSearchSecIngredient"
);

const searchBarIngredients = document.querySelector(".searchBar-ingredient");
const listeIngredients = document.querySelector(".liste-ingredient");
const inputIngredients = document.querySelector(".inputIngredients");
const toggleArrowIngre = document.querySelector(".arrow-ingre");
const btnSectionIngre = document.querySelector(".btn-section-ingre");

const originalLiIngredients = [];

//show search bar of the ingredients lists
btnSectionIngre.addEventListener("click", () => {
  searchBarIngredients.classList.toggle("hidden");

  listeIngredients.classList.toggle("hidden");
  toggleArrowIngre.classList.toggle("fa-chevron-down");
  toggleArrowIngre.classList.toggle("fa-chevron-up");
});

//show ingredients list on the input
inputIngredients.addEventListener("input", () => {
  const value = inputIngredients.value.toLowerCase().trim();

  // Clear existing content
  listeIngredients.innerHTML = "";

  const filteredIngredients = uniqueIngredients.filter((ingredient) => {
    return ingredient.toLowerCase().includes(value);
  });

  if (filteredIngredients.length > 0) {
    displayListSecondaireIngredients(filteredIngredients);
  } else {
    const li = document.createElement("li");
    li.textContent = "No results found.";
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

//createTag function

//createTag function

// ...

// Function to create a tag element
// Function to create a tag element
// Function to create a tag element
const createTagElement = (tagContent) => {
  const tag = document.createElement("span");
  tag.textContent = tagContent;
  tag.style.display = "inline-flex";
  tag.style.padding = "17px 18px";
  tag.style.alignItems = "center";
  tag.style.gap = "60px";
  tag.style.marginLeft = "10px";
  tag.style.borderRadius = "10px";
  tag.style.background = "#FFD15B";
  tag.style.width = "10%";
  tag.classList.add("tag");
  return tag;
};

// Function to create a delete button for the tag
const createDeleteButton = () => {
  const deleteTag = document.createElement("span");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-times");
  deleteIcon.style.cursor = "pointer";
  deleteIcon.style.marginLeft = "-30px";
  deleteTag.appendChild(deleteIcon);
  return deleteTag;
};

// Function to apply tag filter and update displayed recipes
const applyTagFilter = (tagContent, filterProperty, displayedRecipes) => {
  return displayedRecipes.filter(displayedRecipe => {
    switch (filterProperty) {
      case "ingredients":
        return displayedRecipe.ingredients.some(item =>
          item.ingredient.toLowerCase().includes(tagContent.toLowerCase())
        );
      case "appliance":
        return displayedRecipe.appliance.toLowerCase().includes(tagContent.toLowerCase());
      default:
        return true; // No specific filter property, do nothing
    }
  });
};

// Main createTag function
const createTag = (tagContent, filterProperty) => {
  const tag = createTagElement(tagContent);
  const deleteTag = createDeleteButton();
  tagsContainer.appendChild(tag);
  tagsContainer.appendChild(deleteTag);

  const displayedRecipes = Array.from(cartes.children).map(carte => carte.recipe);
  console.log("Displayed Recipes (Before Tag Filter):", displayedRecipes);

  const updatedRecipes = recipes.filter(recipe =>
    applyTagFilter(tagContent, filterProperty, [recipe]).length > 0
  );

  const combinedRecipes = [...displayedRecipes, ...updatedRecipes];

  console.log("Combined Recipes:", combinedRecipes);

  cartes.innerHTML = "";
  displayCartes(combinedRecipes);

  deleteTag.addEventListener("click", () => {
    tag.remove();
    deleteTag.remove();
    cartes.innerHTML = "";
    displayCartes(displayedRecipes); // Re-display the original recipes
  });

  inputIngredients.value = "";
  inputAppareil.value = "";
};










// ...


// ...



// ...



//if search bar displayed a filter, the tag creation should verify is the a filter existe and add
//to the result the new tag creation filter, means the user should use 2 options to filter

//create the function to handle 2 options
// ...



// Clone the original recipes to maintain the original state




























//filter Appareil

const uniqueAppliances = [
  ...new Set(recipes.map((recipe) => recipe.appliance)),
];
const showSearchSecAppBtn = document.querySelector(".showSearchSecAppareil");
const searchBarAppareil = document.querySelector(".searchBar-appareil");
const btnSectionApp = document.querySelector(".btn-section-app");
const listeAppareil = document.querySelector(".liste-appareil");
const inputAppareil = document.querySelector(".inputAppareil");

const toggleArrowApp = document.querySelector(".arrow-app");

const originalLiElements = [];

console.log(listeAppareil);
console.log(uniqueAppliances);

btnSectionApp.addEventListener("click", () => {
  searchBarAppareil.classList.toggle("hidden");
  listeAppareil.classList.toggle("hidden");
  toggleArrowApp.classList.toggle("fa-chevron-down");
  toggleArrowApp.classList.toggle("fa-chevron-up");
});

inputAppareil.addEventListener("input", () => {
  const value = inputAppareil.value.toLowerCase().trim();

  // Clear existing content
  listeAppareil.innerHTML = "";

  // Filter appliances
  const filteredAppliances = uniqueAppliances.filter((appliance) => {
    return appliance.toLowerCase().includes(value);
  });

  // Display filtered appliances or no result message
  if (filteredAppliances.length > 0) {
    displayListSecondaireAppareil(filteredAppliances);
  } else {
    listeAppareil.textContent = "No results found.";
  }
});

const displayListSecondaireAppareil = (appliances) => {
  appliances.forEach((appliance) => {
    const li = document.createElement("li");
    li.textContent = appliance;
    li.addEventListener("click", () => createTag(appliance, "appliance"));
    listeAppareil.appendChild(li);
    originalLiElements.push(li);
  });
};

console.log(originalLiElements);

// Filter ustensiles
const uniqueUstensiles = [
  ...new Set(recipes.map((recipe) => recipe.ustensils)),
];
console.log(uniqueUstensiles);

const showSearchSecUsentBtn = document.querySelector(
  ".showSearchSecUstensiles"
);
const inputUstensiles = document.querySelector(".inputUstensiles");
const listeUstensiles = document.querySelector(".liste-ustensiles");
// const tagsContainer = document.querySelector(".tags-container");
const originalLiElementsUstensiles = [];

// showSearchSecUsentBtn.addEventListener("click", () => {
//   listeUstensiles.classList.toggle("hidden");
//   displayListSecondaireUstensiles();
// });

const displayListSecondaireUstensiles = () => {
  if (listeUstensiles.classList.contains("hidden")) {
    // Clear existing content
    listeUstensiles.innerHTML = "";

    // Add search input as the first list item
    const searchLi = document.createElement("li");
    searchLi.innerHTML = `
      <div class="list-item-content">
        <input type="search" aria-label="Recherche par ustensile" class="inputUstensiles" />
        <i class="fas fa-search loop"></i>
      </div>
    `;
    listeUstensiles.appendChild(searchLi);

    // Select the dynamically added input element
    const inputUstensiles = document.querySelector(".inputUstensiles");

    // Add event listener to the dynamically added input element
    inputUstensiles.addEventListener("input", () => {
      const value = inputUstensiles.value.toLowerCase();
      originalLiElementsUstensiles.forEach((li) => {
        const isVisible = li.textContent.toLowerCase().includes(value);
        li.style.display = isVisible ? "block" : "none";
      });
    });

    // Display each item in ustensils on a new line
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensile) => {
        const li = document.createElement("li");
        li.textContent = ustensile.trim();
        li.addEventListener("click", () => createTag(ustensile, "ustensils"));
        listeUstensiles.appendChild(li);
        originalLiElementsUstensiles.push(li);
      });
    });
  }
};

// function pour filtrer la recherche principale et la recherche secondaire avec les tags:

// Filter recipes based on the selected tags
// const filterRecipes = () => {
//   const tags = document.querySelectorAll(".tag");

//   // Create an array of the tag contents
//   const tagContents = Array.from(tags).map((tag) => tag.textContent.toLowerCase());

//   // Filter the recipes based on the tags
//   const filteredRecipes = recipes.filter((recipe) => {
//     // Check if the recipe matches any of the tags
//     return tagContents.some((tagContent) => {
//       switch (tagContent) {
//         case "ustensil":
//           return recipe.ustensils.some((item) => item.toLowerCase() === tagContent.toLowerCase());
//         case "appliance":
//           return recipe.appliance.toLowerCase() === tagContent.toLowerCase();
//         case "ingredient":
//           return recipe.ingredients.some((item) => item.ingredient.toLowerCase() === tagContent.toLowerCase());
//         default:
//           return true;
//       }
//     });
//   });

//   // Display the filtered recipes
//   cartes.innerHTML = "";
//   displayCartes(filteredRecipes);
// };

//delete tag
