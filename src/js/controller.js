import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  getSearchResultsPage,
  loadRecipe,
  loadSearchResults,
  state,
} from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import BookmarksView from './views/bookmarksView';

const showRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // console.log(id)
    RecipeView.renderSpinner();
    await loadRecipe(id);
    let recipe = state.recipe;
    // console.log(state.recipe)
    RecipeView.render(recipe, minusServings, plusServings, toogleBukmarks);
    rendSearch();
  } catch (err) {
    RecipeView.renderError();
  }
};
const rendSearch = () => {
  ResultsView._generateMarkup();
  PaginationView.removeHandlerPagination(prevPag, nextPag);

  PaginationView.renderPagination();
  PaginationView.addHandlerPagination(prevPag, nextPag);
};

const controlSearchResults = async () => {
  try {
    ResultsView.renderSpinner();
    const query = SearchView.getQuery();
    if (!query) return;
    await loadSearchResults(query);

    state.search.currentPage = 1;
    rendSearch();
  } catch (err) {
    console.log(err);
  }
};

const prevPag = () => {
  if (state.search.currentPage === 1) return;
  state.search.currentPage--;
  rendSearch();
};
const nextPag = () => {
  if (state.search.currentPage === state.search.maxPage) return;
  state.search.currentPage++;
  rendSearch();
};

const minusServings = () => {
  if (state.recipe.servings === 1) return;
  let old = state.recipe.servings;
  state.recipe.servings--;
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * state.recipe.servings) / old)
  );
  // RecipeView.render(state.recipe,minusServings,plusServings);
  RecipeView.update(state.recipe, minusServings, plusServings);
};
const plusServings = () => {
  let old = state.recipe.servings;
  state.recipe.servings++;
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * state.recipe.servings) / old)
  );
  // RecipeView.render(state.recipe,minusServings,plusServings);
  RecipeView.update(state.recipe, minusServings, plusServings);
};

const toogleBukmarks = () => {
  state.recipe.bukmarks = !state.recipe.bukmarks;
  if (state.recipe.bukmarks) {
    state.bukmarks.push(state.recipe);
  } else {
    state.bukmarks = state.bukmarks.filter(rec => rec.id !== state.recipe.id);
  }
  persistBookmarks();
  RecipeView.render(state.recipe, minusServings, plusServings, toogleBukmarks);
  BookmarksView._generateMarkup();
};
const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bukmarks));
};
const init=()=>{
  const storage=localStorage.getItem('bookmarks')
  if(storage) state.bukmarks=JSON.parse(storage)
  BookmarksView._generateMarkup();
}
init()

RecipeView.addHandlerRender(showRecipe);
SearchView.addHandlerSearch(controlSearchResults);
