import View from './View';

import { Fraction } from 'fractional';
import icons from '../../img/icons.svg';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  render(data, minus, plus,bukmarks) {
    const markup = ` <figure class="recipe__fig">
    <img src="${data.image}" alt="${data.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings minus">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings plus">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      
    </div>
    <button class="btn--round btn_bukmarks">
      <svg class="">
        <use href="${icons}#icon-bookmark${data.bukmarks?'-fill':''}"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${data.ingredients
      .map(ing => {
        return `
      
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
      })
      .join('')}

 
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${data.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    document.querySelector('.minus').addEventListener('click', minus);
    document.querySelector('.plus').addEventListener('click', plus);
    document.querySelector('.btn_bukmarks').addEventListener('click',bukmarks)
  }
  update(data, minus, plus) {
    const markup = ` <figure class="recipe__fig">
    <img src="${data.image}" alt="${data.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings minus">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings plus">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${data.ingredients
      .map(ing => {
        return `
      
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
      })
      .join('')}

 
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${data.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

    const newDOM = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements)
    const curElements=Array.from(this._parentElement.querySelectorAll('*'))

    newElements.forEach((newEl,i)=>{
      const curEl=curElements[i]
      // console.log(curEl,newEl.isEqualNode(curEl))
      if(!newEl.isEqualNode(curEl)&&newEl.firstChild?.nodeValue.trim()!==''){
        // console.log('jopa',newEl.firstChild.nodeValue.trim())
        curEl.textContent=newEl.textContent
      }
    })

    document.querySelector('.minus').addEventListener('click', minus);
    document.querySelector('.plus').addEventListener('click', plus);
  }
}

export default new RecipeView();
