console.log('worker started');

self.addEventListener('message', (event) => {
  console.log('worker recieved a message: ' + event.data);
  
  let z;
  for(let i = 0; i < 1000000000; i++) {
    z = i * 2
  }
  
  console.log(z);
  
  self.postMessage(z);
});
