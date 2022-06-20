import './contact-list.css';

import data from './contact-list.json';

import {filterBy, containsPhone, containsText} from '../../js/filter'


const filterCb = (search, contact) => {
    return containsPhone(contact.phone_number, search) || containsText(contact.first_name + ' ' + contact.last_name, search);
  }

export class ContactList {
    constructor(element) {
        if(typeof element === 'string') {
          element = document.querySelector(element);
        }
        
        this.filter = this.filter.bind(this);
        this.onListItemClick = this.onListItemClick.bind(this);
        this.onHtmlClick = this.onHtmlClick.bind(this);
        
        this._element = element;
        
        this._users = data;
        
        this._element.addEventListener('click', this.onListItemClick);
        document.documentElement.addEventListener('click', this.onHtmlClick, true);
    }

    renderItem(contact) {
        return `
        <li class="contact-list-item">
        <div class="contact-main">
          <img src="https://raw.githubusercontent.com/pixelastic/fakeusers/master/pictures/${contact.picture}" alt="" class="contact-list-item-img">
          <span class="contact-list-item-name">${contact.first_name + " " + contact.last_name}</span>
          <span class="contact-list-item-phone">${contact.phone_number}</span>
          <a href="tel:${contact.phone_number}" class="contact-list-item-action">Звонить</a>
        </div>
        <div class="contact-list-item-details hidden">Подробная информация о клиенте ${contact.username}</div>
      </li>`
    }

    _clear() {
        const items = this._element.querySelectorAll('.contact-list-item');
        
        for(const child of items) {
          child.remove();
        }
      }
      
      _renderItems(items) {
        this._clear();
        
        items.forEach(user => {
          const itemHtml = this.renderItem(user);
          
          this._element.insertAdjacentHTML('beforeend', itemHtml);
        })
      }
      
      renderUsers() {
        this._renderItems(this._users);
      }
      
      filter(text) {
        const filterCallback = filterCb.bind(null, text);
        
        this._renderItems(filterBy(this._users, filterCallback));
      }
      
      onListItemClick(e) {
        console.log(e.currentTarget);
        console.log(e.target);
        
        const target = e.target;
        
        if(target.classList.contains('contact-list-item-action')) {
          return;
        }
        
        e.stopImmediatePropagation();
        
        const listItem = e.target.closest('.contact-list-item');
        const details = listItem.querySelector('.contact-list-item-details');
        
        details.classList.toggle('hidden');
      }
      
      onHtmlClick() {
        console.log('html click');
      }
}