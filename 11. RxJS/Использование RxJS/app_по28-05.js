import { Observable, Subject, fromEvent, from, of, range } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';

const email = document.querySelector('.email');
const hello = document.querySelector('.hello');

const stream$ = fromEvent(email, 'input')
  .pipe(
    debounceTime(300),
    pluck('target', 'value'),
    map(value => value.trim()),
    filter(Boolean),
    distinctUntilChanged(),
    switchMap(value => {
      return fetch('http://localhost:7070/api/check-email?email=' + value)
        .then(response => response.json());
    }),
    catchError(err => {
      console.log(err);
      
      return of({ available: false });
    }),
    .map(value => value.available)
  );

const checkSubject$ = new Subject();

checkSubject$.subscribe((value) => {
  console.log(value);
});

setTimeout(() => {
  console.log('2nd subscription');
  checkSubject$.subscribe((value) => {
    console.log(value);
  });
}, 10000);

stream$.subscribe(checkSubject$);

const fetchStream$ = from(fetch('http://localhost:8080/'));

fetchStream$.subscribe((value) => {
  console.log(value);
});

const arrayStream$ = range(1, 10)
  .pipe(
    map(x => x * 2),
    filter(x => x > 5),
    startWith(0)
  );

arrayStream$.subscribe((value) => {
  console.log(value);
});


