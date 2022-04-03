import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';//parcel 2

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try something else!';
    _message = '';

    _generateMarkup() {
      //don't get confused. map(this._generateMarkupPreview(each data) {return ...}) --- map(() => {return ...})
      //*we don't need to render all data from view, so 'render = false' return markup which is a string then join them to return markup
      return this._data.map(results => previewView.render(results, false)).join('');
  }
}

export default new ResultsView();