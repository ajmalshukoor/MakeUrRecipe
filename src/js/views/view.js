import icons from 'url:../../img/icons.svg';//parcel 2

// using no instance from this class just using for another classes
export default class View{
    _data;
    
   /**
   * Render the recieved object to the DOM 
   * @param {Object | Object[]} data The data to be rendered (eg. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned oif render= flase render
   * @this {Object} View instance 
   * @author Ajmal Abdul Shukoor
   * @todo Finish implemention
   */
    //render is a part of public api
    
    render(data, render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        
        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    //just for updated view, similiar as render
    update(data){
      this._data = data;
      const newMarkup = this._generateMarkup();
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));
      newElements.forEach((newEl, i) => {
        //iterating second array at the same time
        const curEl = curElements[i];

        //update change text
        //only picking text to replace instead of whole element to avoid encountering visual distortion
        if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
          curEl.textContent = newEl.textContent
        }
        //update change attributes
        if(!newEl.isEqualNode(curEl)){
          //copying new elements attributes to current 
          Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
        }
      });
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner(){
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage){
      const markup =`
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
       `;
       this._clear();
       this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderMessage(message = this._message){
      const markup =`
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
       `;
       this._clear();
       this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

}

