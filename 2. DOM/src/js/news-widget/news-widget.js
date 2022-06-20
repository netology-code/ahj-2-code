class NewsWidget {
    constructor(element) {
        this._element = element;
    }

    deleteLastNews() {
        const newsElements = this._element.querySelectorAll('.news-item');

        const lastNewsElement = newsElements[newsElements.length - 1];

        this._element.removeChild(lastNewsElement);
    }

    addNewNews(title) {
        const item = document.createElement('li');

        item.textContent = title;
        item.classList.add('news-item');

        this._element.insertBefore(item, this._element.querySelector('.news-item'));

        // this._element.innerHTML += `<li>${title}</li>`;

        this.deleteLastNews(); 
    }
}