import { Observable, Subject, fromEvent, from, of, range } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';

const email = document.querySelector('.email');
const hello = document.querySelector('.hello');

function getRequest(url) {
  return new Observable((observer) => {
    const controller = new AbortController();

    fetch(url, {
      signal: controller.signal,
    })
      .then(res => res.json())
      .then((data) => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));

    return () => controller.abort();
  }
}

const stream$ = fromEvent(email, 'input')
  .pipe(
    debounceTime(300),
    pluck('target', 'value'),
    map(value => value.trim()),
    filter(Boolean),
    distinctUntilChanged(),
    switchMap(value => {
      return getRequest('http://localhost:7070/api/check-email/?email=', value)
        .pipe(
          catchError(err => {
            console.log(err);
          
            return of({ available: false });
          }),
        )
    }),
    map(value => value.available)
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

// const fetchStream$ = from(fetch('http://localhost:8080/'));

// fetchStream$.subscribe((value) => {
//   console.log(value);
// });

// const arrayStream$ = range(1, 10)
//   .pipe(
//     map(x => x * 2),
//     filter(x => x > 5),
//     startWith(0)
//   );

// arrayStream$.subscribe((value) => {
//   console.log(value);
// });

from([1, 2, 3, 4])
  .pipe(
    exhaustMap(value => {
      return getRequest('http://localhost:7070/api/check-email/?email=', value)
        .pipe(
          catchError(err => {
            console.log(err);
          
            return of({ available: false });
          }),
        )
    }),
  ).subscribe(console.log)
  
const draggable = (el) => {
  const startDrag$ = fromEvent(el, 'mousedown');
  const moveDrag$ = fromEvent(document, 'mousemove');
  const endDrag$ = fromEvent(el, 'mouseup');
  
  return startDrag$.pipe(
    switchMap((event) => {
      event.stopPropagation();
      const diffX = el.offsetLeft - event.clientX;
      const diffY = el.offsetTop - event.clientY;
      return moveDrag$.pipe(
        map((event) => {
          const { clientX, clientY } = event;
          return {
            x: clientX + diffX,
            y: clientY + diffY,
          };
        }),
        takeUntil(endDrag$),
      );
    })
  );
};

draggable(email).subscribe(coord => {
  email.style.top = `${coord.y}px`;
  email.style.left = `${coord.x}px`;
});
