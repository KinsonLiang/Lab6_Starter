// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() 
{
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();

  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);

  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() 
{
  if(!localStorage.getItem("recipes"))
  {
    return [];
  }

  return JSON.parse(localStorage.getItem("recipes"));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) 
{
  const main = document.querySelector('main');

  for(let i = 0; i < recipes.length; i++) 
  {
    let temp = document.createElement('recipe-card');
    temp.data = recipes[i];

    main.appendChild(temp);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() 
{
  let form = document.querySelector('form');
  const main = document.querySelector('main');

  form.addEventListener('submit', (event) => 
  {
    event.preventDefault()
    let temp = new FormData(form);
    let recipe_list = [];
    let recipeObject = temp.entries();
    
    for (const entry of recipeObject) 
    {
      recipe_list[entry[0]] = entry[1];
    }

    let new_card = document.createElement('recipe-card');
    new_card.data = recipe_list;
    main.appendChild(new_card);

    let recipe_already = getRecipesFromStorage();
    recipe_list.push(recipe_list);
    saveRecipesToStorage(recipe_list);
  });

  const clear = document.getElementsById('clear');
  clear.addEventListener('click', (event) => 
  {
    localStorage.clear();
    main.innerHTML = '';
  });
}