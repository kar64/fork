import View from './View'
import icons from '../../img/icons.svg';
import { getSearchResultsPage } from '../model';
import { state } from '../model'


class BookmarksView extends View {
    _parentElement=document.querySelector('.bookmarks__list')
    _errorMessage='No bookmarks yet. Find a nice recipe and bookmark it :)'
    _message=''


    _generateMarkup(){
       
        if(state.bukmarks.length===0) return this.renderError()
        const markup= state.bukmarks.map(el=>`
           <li class="preview">
            <a class="preview__link" href="#${el.id}">
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

export default new BookmarksView()