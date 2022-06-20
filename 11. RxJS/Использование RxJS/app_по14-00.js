import { Observable, fromEvent } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

const email = document.querySelector('.email');
const hello = document.querySelector('.hello');

const stream$ = fromEvent(email, 'input')
  .pipe(
    pluck('target', 'value')
  );

stream$.subscribe((value) => {
  hello.textContent = 'Привет, ' + ( value || 'Guest');
});
stream$.subscribe(((name, value) => {
  console.log('Input event in ' + name + ' value ' + value + ' time ' + performance.now());
}).bind(null, 'email'));
stream$.subscribe((value) => {
  fetch('http://localhost:7070/email/check/' + value);
});

