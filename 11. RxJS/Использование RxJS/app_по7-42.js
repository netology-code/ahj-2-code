import { Observable } from 'rxjs';

const email = document.querySelector('.email');

const stream$ = new Observable((observer) => {
  const interval = setInterval(() => {
    const value = performance.now();

    console.log('in observer ' + value);

    observer.next(value);
  }, 5000);

  const handler = () => {
    const value = performance.now();

    console.log('in handler ' + value);
    observer.next(value);
  }

  email.addEventListener(handler);

  setTimeout(() => {
    observer.complete();
  }, 10500);

  return () => {
    clearInterval(interval);

    email.removeEventListener('input', handler);
  };
});

stream$.subscribe((value) => {
  console.log('in subscriber');

  console.log(value);
});

setTimeout(
  () => {
    stream$.subscribe((value) => {
      console.log('in subscriber');

      console.log(value);
    });
   }, 1000
);
