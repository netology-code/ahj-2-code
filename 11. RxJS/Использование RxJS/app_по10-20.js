import { Observable } from 'rxjs';

const email = document.querySelector('.email');
const hello = document.querySelector('.hello');

const stream$ = new Observable((observer) => {
  const handler = (event) => {
    observer.next(event.target.value);
  }

  email.addEventListener(handler);

  return () => {
    email.removeEventListener('input', handler);
  };
});

stream$.subscribe((value) => {
  hello.textContent = 'Привет, ' + ( value || 'Guest');
});
stream$.subscribe(((name, value) => {
  console.log('Input event in ' + name + ' value ' + value + ' time ' + performance.now());
}).bind(null, 'email'));
stream$.subscribe((value) => {
  fetch('http://localhost:7070/email/check/' + value);
});

