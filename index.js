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
  document.body.append(cartes);
};

const searchRecip = () => {
  const searchTerm = inputSearch.value.toLowerCase().trim();
  console.log("Search Term:", searchTerm);

  const filterArray = recipes.filter((recette) => {
    const matchesSearch =
      recette.name.toLowerCase().includes(searchTerm) ||
      recette.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
      ) ||
      recette.description.toLowerCase().includes(searchTerm);

    if (!matchesSearch) {
      // Clear existing content
      cartes.innerHTML = "";
      displayNoResult(searchTerm);
    }

    return matchesSearch;
  });

  console.log("Filtered Array:", filterArray);

  // Clear existing content
  // cartes.innerHTML = "";

  // Display filtered recipes
  displayCartes(filterArray);

  filterAppareil();
};

// Add a click event listener to the magnifying glass element
searchLoup.addEventListener("click", searchRecip);

//recherche secondaire


//filter Appareil
// const showSearchSecAppBtn = document.querySelector(".showSearchSecAppareil");
// const listeAppareil = document.querySelector(".liste-appareil");
// const inputAppareil = document.querySelector(".inputAppareil");
// const liElements = document.querySelectorAll(
//   ".liste-appareil li:not(.list-item-content)"
// );

// showSearchSecAppBtn.addEventListener("click", () => {
//   listeAppareil.classList.toggle("hidden");

//   displayListSecondaireAppareil();
// });

// inputAppareil.addEventListener("input", () => {
//   const value = inputAppareil.value.toLowerCase();
//   const filteredElements = liElements.filter((li) => li.textContent.toLowerCase().includes(value));

//   listeAppareil.innerHTML = '';
//   filteredElements.forEach((li) => {
//     const applianceP = document.createElement('p');
//     applianceP.textContent = li;
//     listeAppareil.appendChild(applianceP);
//   });
// });

// const displayListSecondaireAppareil = () => {
//   if (listeAppareil.classList.contains("hidden")) {
//     recipes.forEach((recipe) => {
//       const p = document.createElement("p");
//       p.textContent = recipe.appliance;
//       listeAppareil.appendChild(p);
//     });
//   }
// };


const uniqueAppliances = [...new Set(recipes.map(recipe => recipe.appliance))];



const showSearchSecAppBtn = document.querySelector(".showSearchSecAppareil");
const listeAppareil = document.querySelector(".liste-appareil");
const inputAppareil = document.querySelector(".inputAppareil");
const tagsContainer = document.querySelector(".tags-container");

const originalLiElements = [];

showSearchSecAppBtn.addEventListener("click", () => {
  listeAppareil.classList.toggle("hidden");
  displayListSecondaireAppareil();
});

inputAppareil.addEventListener("input", () => {
  const value = inputAppareil.value.toLowerCase();

  originalLiElements.forEach((li) => {
    const isVisible = li.textContent.toLowerCase().includes(value);
    li.style.display = isVisible ? 'block' : 'none';
  });
});

const displayListSecondaireAppareil = () => {
  if (listeAppareil.classList.contains("hidden")) {
    uniqueAppliances.forEach((appliance) => {
      const li = document.createElement("li");
      li.textContent = appliance;
      li.addEventListener("click", () => createTagAppareil(appliance));
      listeAppareil.appendChild(li);
      originalLiElements.push(li);
    });
  }
};


// Create a tag based on the search value
const createTagAppareil = (tagContent) => {
  const tag = document.createElement("span");
  tag.textContent = tagContent;
  tagsContainer.appendChild(tag);
};



  // liElements.forEach((li) => {
  //   const appliance = li.textContent.toLowerCase();
  //   const isVisible = appliance.includes(value);
  //   li.style.display = isVisible ? "block" : "none";
  // });


//filter ustensiles
const showSearchSecUsentBtn = document.querySelector(
  ".showSearchSecUstensiles"
);

const listeUstensiles = document.querySelector(".liste-usentiles");

showSearchSecUsentBtn.addEventListener("click", () => {
  listeUstensiles.classList.toggle("hidden");

  displayListSecondaireUstensiles();
});

const displayListSecondaireUstensiles = () => {
  if (listeUstensiles.classList.contains("hidden")) {
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensile) => {
        const li = document.createElement("li");
        li.textContent = ustensile;
        listeUstensiles.appendChild(li);
      });
    });
  }
};

//filter Ingredients
const showSearchSecIngreBtn = document.querySelector(
  ".showSearchSecIngredient"
);

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
