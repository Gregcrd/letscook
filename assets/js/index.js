console.log("script loaded !");

const container = document.querySelector(".recipes");
// selectionner les element de filtres : input, select

console.log("container:", container);

// fetch('https://dummyjson.com/recipes')
// .then(res => res.json())
// .then(console.log);

// fonction fetch c'est une fonction async ici c est celle pour recuper dans api données json
const input = document.querySelector("#searchInput");
const limitSelect = document.querySelector("#limitSelect");
let userKeyword = "";
let recipeLimit = 10; // Valeur 10 recettes

async function fetchRecettes(kw ='', limit = 10) {
  try {
    let userQuery = `/search?q=${kw}`;
    const responseServeur = await fetch(
      `https://dummyjson.com/recipes${userQuery}`
    );

    if (!responseServeur.ok) {
      throw new Error("erreur lors de la recuperation json");
    }

    const response = await responseServeur.json();

    return response.recipes.slice(0,limit);
  } catch (error) {
    console.error("Une erreur s'est produite : ", error);
  }
}
// ici fonction pour trier les recettes par ordre d'id

// async function fetchRecettesTrie() {
//   const recettes = await fetchRecettes();
//   if (!recettes) {
//     throw new Error("pas de données disponibles pour le tri");
//   }

//   return recettesTriees;
// }

// ici pour afficher les elements

async function affichageRecette(kw) {
  container.innerHTML="chargement en cours..."
  const data = await fetchRecettes(kw , recipeLimit) ;
  console.log(data);
  if (!data || data.length === 0) {
    container.innerHTML = "<p>Aucune recette trouvée.</p>";
    return;
}
  container.innerHTML="";
  data.forEach(function (element) {
    const article = document.createElement("article");

    // console.log(element);
    article.innerHTML += `
            <h3>${element.name}</h3>
            <p>${element.ingredients}</p>
        `;
    container.appendChild(article);
  });
  
}

affichageRecette();
// test recherche repas



input.addEventListener("input", function (event) {
 userKeyword = event.target.value;

  // if (!userKeyword) {
  //   alert("Veuillez saisir un mot dans la liste pour rechercher une recette.");
  //   return;
  // }
  // Construire l'URL pour l'API
  var userQuery = "https://dummyjson.com/recipes/search?q=" + userKeyword;
  console.log("URL générée :", userQuery);

  // Appeler l'API avec l'URL
  affichageRecette(userKeyword);
});
limitSelect.addEventListener("change", function (event) {
  recipeLimit = parseInt(event.target.value, 10); // Mettre à jour la limite
  affichageRecette(userKeyword); // Recharger les recettes avec la nouvelle limite
});


