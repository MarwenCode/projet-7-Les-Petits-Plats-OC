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

const searchRecip = () => {
  const searchTerm = inputSearch.value.toLowerCase().trim();
  console.log("Search Term:", searchTerm);

  // Check if the search term is at least 3 characters long
  if (searchTerm.length >= 3) {
    const filterArray = recipes.filter((recette) => {
      const matchesSearch =
        recette.name.toLowerCase().includes(searchTerm) ||
        recette.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        ) ||
        recette.description.toLowerCase().includes(searchTerm);

      return matchesSearch;
    });

    console.log("Filtered Array:", filterArray);

    // Clear existing content
    cartes.innerHTML = "";

    // Display filtered recipes or no result message
    if (filterArray.length > 0) {
      displayCartes(filterArray);
    } else {
      displayNoResult(searchTerm);
    }
  }
};

// Add a click event listener to the magnifying glass element
searchLoup.addEventListener("click", searchRecip);
inputSearch.addEventListener("input", searchRecip);

//recherche secondaire//

//filter Appareil

const uniqueAppliances = [...new Set(recipes.map((recipe) => recipe.appliance))];
const showSearchSecAppBtn = document.querySelector(".showSearchSecAppareil");
const searchBarAppareil = document.querySelector(".searchBar-appareil")
const listeAppareil = document.querySelector(".liste-appareil");
const inputAppareil = document.querySelector(".inputAppareil");
const tagsContainer = document.querySelector(".tags-container");

const originalLiElements = [];

console.log(listeAppareil);
console.log(uniqueAppliances)


showSearchSecAppBtn.addEventListener("click", () => {
  // listeAppareil.classList.toggle("hidden");
  // searchBar.style.display ="block"

  searchBarAppareil.classList.toggle("hidden");
  


  
});

inputAppareil.addEventListener("input", () => {
  listeAppareil.classList.toggle("hidden");
  const value = inputAppareil.value.toLowerCase();

  // originalLiElements.forEach((li) => {
  //   const isVisible = li.textContent.toLowerCase().includes(value);
  //   li.style.display = isVisible ? "block" : "none";
  // });

  //  displayListSecondaireAppareil()

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

console.log(originalLiElements)





//filter Ingredients
const showSearchSecIngreBtn = document.querySelector(".showSearchSecIngredient");

const listeIngredients = document.querySelector(".liste-ingredient");

const displayListSecondaireIngredients = () => {
  if (listeIngredients.classList.contains("hidden")) {
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingre) => {
        const li = document.createElement("li");
        li.textContent = ingre.ingredient;
        listeIngredients.appendChild(li);
      });
    });
  }
};

showSearchSecIngreBtn.addEventListener("click", () => {
  listeIngredients.classList.toggle("hidden");
  displayListSecondaireIngredients();
});













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

showSearchSecUsentBtn.addEventListener("click", () => {
  listeUstensiles.classList.toggle("hidden");
  displayListSecondaireUstensiles();
});

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











//createTag function

const createTag = (tagContent, filterProperty) => {
  const tag = document.createElement("span");
  const deleteTag = document.createElement("span");
  const deleteIcon = document.createElement("i");
  tag.textContent = tagContent;

  // Apply styles to the tag
  tag.style.display = "inline-flex";
  tag.style.padding = "17px 18px";
  tag.style.alignItems = "center";
  tag.style.gap = "60px";
  tag.style.marginLeft = "10px";
  tag.style.borderRadius = "10px";
  tag.style.background = "#FFD15B";

  // Apply styles to the delete icon
  deleteIcon.classList.add("fas", "fa-times");
  deleteIcon.style.cursor = "pointer";

  // Add the delete icon to the delete tag
  deleteTag.appendChild(deleteIcon);

  tagsContainer.appendChild(tag);
  tagsContainer.appendChild(deleteTag);

  // Filter recipes based on the selected tag
  const filteredRecipes = recipes.filter((recipe) => {
    if (Array.isArray(recipe[filterProperty])) {
      return recipe[filterProperty].some(
        (item) => item.toLowerCase() === tagContent.toLowerCase()
      );
    } else {
      return recipe[filterProperty].toLowerCase() === tagContent.toLowerCase();
    }
  });

  cartes.innerHTML = "";
  // Display the filtered recipes
  displayCartes(filteredRecipes);

  // Add an event listener to the delete tag to remove the tag and filter the recipes
  deleteTag.addEventListener("click", () => {
    tag.remove();
    deleteTag.remove();

    // Filter recipes based on the remaining tags
    displayCartes(recipes);
  });

  // Show the ul list and clear the input when a tag is created
  listeUstensiles.classList.remove("hidden");
  listeAppareil.classList.remove("hidden");
  //  inputUstensiles.value = "";
};

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




