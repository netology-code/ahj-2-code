console.log('worker started');

self.addEventListener('message', (event) => {
  console.log('worker recieved a message: ');
  
  console.log(event.data);
  
  const reader = new FileReader();
  
  reader.addEventListener('load', (event) => {
    const content = event.target.result;
    
    self.postMessage(content);
  });
  
  reader.readAsDataURL(event.data);
});
