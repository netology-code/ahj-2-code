export class FilterWidget {
    constructor(element, filterHandler) {
        if(typeof element === 'string') {
            element = document.querySelector(element);
        }

        this._filterText = document.querySelector('.filter-text')

        this._filterHandler = filterHandler;
        this.onFilter = this.onFilter.bind(this);
        this._element = element;
    
        this._filterText.addEventListener('input', this.onFilter);
    }

    onFilter(e) {
        e.preventDefault();
        
        if(this._timeout) {
          clearTimeout(this._timeout);
        }
        
        const text = this._filterText.value;
        
        this._timeout = setTimeout(() => this._filterHandler(text), 300);
    }
}