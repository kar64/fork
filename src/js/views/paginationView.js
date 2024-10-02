import View from './View';
import icons from '../../img/icons.svg';
import { state } from '../model';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  removeHandlerPagination(handlerPrev, handlerNext) {
    if (!document.querySelector('.pagination__btn--prev')) return;
    document
      .querySelector('.pagination__btn--prev')
      .removeEventListener('click', handlerPrev);
    document
      .querySelector('.pagination__btn--next')
      .removeEventListener('click', handlerNext);
  }
  addHandlerPagination(handlerPrev, handlerNext) {
    document
      .querySelector('.pagination__btn--prev')
      .addEventListener('click', handlerPrev);
    document
      .querySelector('.pagination__btn--next')
      .addEventListener('click', handlerNext);
  }
  renderPagination() {
    const markup = `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${
              state.search.currentPage === 1 ? '' : state.search.currentPage - 1
            }</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${
              state.search.currentPage === state.search.maxPage
                ? ''
                : state.search.currentPage + 1
            }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new PaginationView();
