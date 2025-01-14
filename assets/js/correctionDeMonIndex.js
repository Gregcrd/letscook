console.log("script loaded !");
 
const container = document.querySelector(".recipes");
// selectionner les element de filtres : input, select
 
console.log("container:", container);
 
// fetch('https://dummyjson.com/recipes')
// .then(res => res.json())
// .then(console.log);
 
// fonction fetch c'est une fonction async ici c est celle pour recuper dans api données json
const searchBarElement = document.querySelector("#searchInput");
const selectElement = document.querySelector("#limitSelect");


let currentKeyWord = "";
let currentFilter = "" ;
let currentLimit = "" ;
 
 
 
async function fetchRecettes(keyWord ='',  filterSortBy = 'sortBy=id&order=desc' ,limit = '10') {
  try {
    const queryKeyWord = keyWord ? `/search?q=${keyWord}` : "";
    const queryFilter = filterSortBy
      ? `${queryKeyWord ? "&" : "?"}${filterSortBy}`
      : "";
    const queryLimit = limit
      ? `${queryKeyWord || queryFilter ? "&" : "?"}limit=${limit}`
      : "";

      
      const url = `https://dummyjson.com/recipes${queryKeyWord}${queryFilter}${queryLimit}`;

      console.log('url:', url)
    const responseServeur = await fetch(url);
   
   
 
    if (!responseServeur.ok) {
      throw new Error("erreur lors de la recuperation json");
    }
 
    const response = await responseServeur.json();
   
   return response
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
 
async function affichageRecette(keyWord , filterSortBy , limit) {
  container.innerHTML="chargement en cours...";

  const data = await fetchRecettes(keyWord , filterSortBy , limit) ;
  console.log(data);
  
  if (!data || data.length === 0) {
    container.innerHTML = "<p>Aucune recette trouvée.</p>";
    return;
}
  container.innerHTML="";
  data.recipes.forEach(function (element) {
    const article = document.createElement("article");
 
    // console.log(element);
    article.innerHTML += `
    <img src="${element.image}"  alt="${element.name}">
            <h3>${element.name}</h3>
            <p>${element.ingredients}</p>
           
        `;
    container.appendChild(article);
  });
 
}
 
affichageRecette();
// test recherche repas
 
 
 
searchBarElement.addEventListener("input", function (event) {
 currentKeyWord = event.target.value;
 
  // if (!userKeyword) {
  //   alert("Veuillez saisir un mot dans la liste pour rechercher une recette.");
  //   return;
  // }
  // Construire l'URL pour l'API
  var userQuery = "https://dummyjson.com/recipes/search?q=" + currentKeyWord;
  console.log("URL générée :", userQuery);
 
  // Appeler l'API avec l'URL
  affichageRecette(currentKeyWord);
});
limitSelect.addEventListener("change", function (event) {
 
  affichageRecette(currentKeyWord); // Recharger les recettes avec la nouvelle limite
});
 