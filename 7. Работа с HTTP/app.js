// TODO: write code here

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const nameInput = subscribeWidget.querySelector('.name');
const phoneInput = subscribeWidget.querySelector('.phone');
const unsubscribeBtn = subscribeWidget.querySelector('.unsubscribe-btn');

subscribeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = new FormData(subscribeForm);

  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
    
    console.log(xht.responseText);
  }
  
  xhr.open('POST', 'http://localhost:7070');
  
  xhr.send(body);
});

unsubscribeBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const body = Array.from(subscribeForm.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&');

  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
    
    console.log(xht.responseText);
  }
  
  xhr.open('DELETE', 'http://localhost:7070' + body);
  
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  
  xhr.send();
});

const uploadForm = document.querySelector('.upload-form);
const previewImage = document.querySelector('.preview-image');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = new FormData(uploadForm);

  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
    
    console.log(xhr.responseText);
    previewImage.src = 'http://localhost:7070' + xhr.responseText;
  }
  
  xhr.open('POST', 'http://localhost:7070/upload');
  
  xhr.send(body);
});
