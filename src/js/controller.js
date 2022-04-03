import * as model from './model.js';
import {MODAL_CLOSE_SEC} from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


// https://forkify-api.herokuapp.com/v2

//Getting recipe data
const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    //update results view to mark selected search results as selected
    resultsView.update(model.getSearchResultsPage());

    //updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    
    //loading recipe
    await model.loadRecipe(id);
    
    //Rendering recipe 
    recipeView.render(model.state.recipe);
    
    }catch(err){
      console.error(err);
      recipeView.renderError();
    }
}

const controlSearchResults = async function(){
  try{
    //get search query
    const query = searchView.getQuery();
    if(!query) return;
    
    resultsView.renderSpinner();
    //load search results
    await model.loadSearchResults(query);
    
    //Rendering search results 
    resultsView.render(model.getSearchResultsPage());

    //Rendering initial pagination button
    paginationView.render(model.state.search);

  } catch(err){
    console.error(err);
  }
}

const controlPagination = function(goToPage){
    //Rendering search results 
    resultsView.render(model.getSearchResultsPage(goToPage));

    //Rendering initial pagination button
    paginationView.render(model.state.search);
}
// showRecipe();
const controlServings = function(newServings){
  //update the recipe servings (in state)
  model.updateServings(newServings);
  
  //update the view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  //add and remove bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //updaterecipe view
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

//it should be async function look back to the async section
const controlAddRecipe = async function(newRecipe){
  try{
    //Show loading spinners
    addRecipeView.renderSpinner();

    //upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe data
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();

    //Render bookmarks view
    bookmarksView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    
    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC*1000);
  }
  catch(err){
    console.error(err);
    addRecipeView.renderError(err.message);
  }
}
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
  // //here the recipe is not defined yet so it will show an error just with controlServings();
};
init();