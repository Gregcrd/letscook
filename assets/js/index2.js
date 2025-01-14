//Chargement de la liste
const dataLoading = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
    }
};

const displayRecipes = (recipes) => {
    const recipesListe = document.querySelector('.recipes');
    if (!recipesListe) {
        console.error('Recipes container not found!');
        return;
    }

    recipesListe.innerHTML = '';
    recipes.forEach((element) => {
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <div class="card">
            <h2>${element.name}</h2>
            <img src="${element.image}" alt="${element.name}">
            <br>
            <span>${element.ingredients.join(', ')}</span>
            <br>
            </div>
            `;
        recipesListe.appendChild(recipeElement);
    });
};

const updateRecipes = async (limit, filter, query) => {
    const url = `https://dummyjson.com/recipes/search?limit=${limit}&${filter}&q=${query}`;
    const data = await dataLoading(url);
    if (data?.recipes) {
        displayRecipes(data.recipes);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    dataLoading('https://dummyjson.com/recipes?limit=12')
        .then((data) => {
            if (data?.recipes) {
                displayRecipes(data.recipes);
            }
        });

    const firstFilter = document.querySelector('#first-select');
    const secondFilter = document.querySelector('#second-select');
    const searchForm = document.querySelector('.search-form');

    let firstFilterValue = '';
    let secondFilterValue = '';
    let searchQuery = '';

    firstFilter.addEventListener('change', (e) => {
        firstFilterValue = e.target.value;
        updateRecipes(firstFilterValue, secondFilterValue, searchQuery);
    });

    secondFilter.addEventListener('change', (e) => {
        secondFilterValue = e.target.value;
        updateRecipes(firstFilterValue, secondFilterValue, searchQuery);
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchQuery = e.target[0].value;
        updateRecipes(firstFilterValue, secondFilterValue, searchQuery);
    });
});

console.log("index.js loaded");