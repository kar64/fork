import View from './View'
import icons from '../../img/icons.svg';
import { getSearchResultsPage } from '../model';
import { state } from '../model'

class ResultsView extends View {
    _parentElement=document.querySelector('.results')
    _errorMessage='No recipes found for your query! Please try again ;)'
    _message=''


    _generateMarkup(){
      const { start, end } = getSearchResultsPage(state.search.currentPage);

      this._data = state.search.results.slice(start, end);
       
        if(this._data.length===0) return this.renderError()
          const id=window.location.hash.slice(1)
        const markup= this._data.map(el=>`
           <li class="preview">
            <a class="preview__link ${el.id==id?'preview__link--active':''}" href="#${el.id}">
              <figure class="preview__fig">
                <img src="${el.image}" alt="${el.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${el.title}</h4>
                <p class="preview__publisher">${el.publisher}</p>
             
              </div>
            </a>
          </li>
        `).join('')
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new ResultsView()