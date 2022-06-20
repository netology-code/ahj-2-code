class Subject {
	constuctor() {
		this.observers = [];
	}

	subscribe(observer) {
		this.observers.push(observer);
	}

	next(value) {
		this.observers.forEach(observer => observer(value));
	}
}

const emailStream$ = new Subject();

const email = document.querySelector('.email');

email.addEventListener('input', (event) => {
	emailStream$.next(event.target.value);
});

function updateHello(value) {
	const hello = document.querySelector('.hello');

	hello.textContent = 'Привет, ' + (value || 'Guest');
}

function logTextInput(name, value) {
  const time = performance.now();

  console.log('Input in ' + name + ' : ' + value + ' ' + time);
}

function fetchEmailIsAvailable(value) {
  fetch('http://localhost:7070/check/email/' + value);
}

emailStream$.subscribe(updateHello);
emailStream$.subscribe(logTextInput.bind(null, 'email'));
emailStream$.subscribe(fetchEmailIsAvailable);
