import { API_URL, RES_PER_PAGE } from './config';
import { controlSearchResults } from './controller';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  bukmarks:[],
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    currentPage: 1,
    maxPage: 1,
    maxQuantity: 0,
  },
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const recipe = data.data.recipe;
    const isBukmarks=state.bukmarks.length>0&&state.bukmarks.filter(el=>el.id===id).length===1

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      bukmarks:isBukmarks
      // bukmarks:false
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = 1) => {
  state.search.maxPage = Math.ceil(state.search.results.length / RES_PER_PAGE);
  state.search.maxQuantity = state.search.results.length ;
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end =
    start + state.search.resultsPerPage < state.search.maxQuantity
      ? start + state.search.resultsPerPage
      : state.search.maxQuantity;
  return { start, end };
};
const persistBookmarks=()=>{
  localStorage.setItem('bookmarks',JSON.stringify(state.bukmarks))
}
