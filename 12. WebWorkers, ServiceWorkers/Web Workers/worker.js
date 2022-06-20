importScripts('./node_modules/jszip/dist/jszip.min.js');

self.addEventListener('message', (event) => {
  var zip = new JSZip();
  console.log(zip);
  console.log('worker recieved a message: ');

  console.log(event.data);
  
  const fileName = event.data.name;

  const reader = new FileReader();

  reader.addEventListener('load', (event) => {
    const content = event.target.result;

    zip.file(fileName, content);

    zip.generateAsync({ type:"blob" }).then(function(zipcontent) {
      console.log(zipcontent);
      
      self.postMessage(zipcontent);
    });
  });
  
  reader.readAsBinaryString(event.data);
});
