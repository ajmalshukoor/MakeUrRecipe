import View from './view.js';
import previewView from './previewView.js';

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
    _message = '';

    //this is to prevent the bug from view.js update func. newEl != curEl count without this rendering
    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

    _generateMarkup() {
        //don't get confused. map(this._generateMarkupPreview(each data) {return ...}) --- map(() => {return ...})
        //*we don't need to render all data from view, so 'render = false' return markup which is a string then join them to return markup
        return this._data.map(bookmarkRes => previewView.render(bookmarkRes, false)).join('');
    }
}

export default new BookmarksView();