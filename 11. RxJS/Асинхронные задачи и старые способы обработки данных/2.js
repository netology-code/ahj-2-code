// на конец урока
fromEvent(suggest, 'input')
  .pipe(
    debounceTime(100),
    pluck('target','value'),
    filter(value => value.trim() !== ''),
    switchMap(value => request('http://api/' + value))
  );

/* по 08:15
const form = document.querySelector('.form');

form.addEventListener('submit', () => {
  const tokenRequest = new XMLHttpRequest(/* данные запроса /);
  
  tokenRequest.addEventListener('load', () => {
    const data = new FormData(form);
    
    const formRequest = new XMLHttpRequest(/* данные запроса 2 /);
    
    formRequest.addEventListener('load', () => {
      // реакция интерфейса
      
      console.log('успех');
    });
  
    formRequst.send(data);
  });
  
  tokenRequest.send();
});*/
