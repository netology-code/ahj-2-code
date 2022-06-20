// TODO: write code here
import { mdConvert } from 'md-converter';

console.log('app.js bundled');

const fileContainer = document.querySelector('.file-container');
const fileInput = fileContainer.querySelector('.overlapped');

const previewTitle = document.querySelector('.preview-title');
const previewText = document.querySelector('.preview-text');
const previewHtml = document.querySelector('.preview-html');
const previewImage = document.querySelector('.preview-image');

fileContainer.addEventListener('click', (e) => {
    console.log(e);
    
    console.log('click');

    fileInput.dispatchEvent(new MouseEvent('click'));
});

fileContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
})

fileContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    console.log('drop')

    previewImage.src = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0])
})

const displayImageContent = (e) => {
    console.log(e);

    previewImage.src = e.target.result;
}

const displayTextContent = (e) => {
    console.log(e);

    previewText.textContent = e.target.result;
}

const displayMDTextContent = (e) => {
    console.log(e);

    previewHtml.innerHTML = mdConvert(e.target.result);
}

fileInput.addEventListener('change', (e) => {
    console.log(e);
    console.dir(fileInput)

    const file = fileInput.files && fileInput.files[0];

    if(!file) return;

    previewTitle.textContent = file.name;

    const url = URL.createObjectURL(file);

    const link = document.createElement('a');

    link.href = url;
    link.rel = 'noopener';
    link.download = file.name;

    link.click();

    console.log(url)
})



const items = document.querySelector('.items');

const itemsElements = items.querySelector('.items-item');

let actualElement;

const onMouseOver = (e) => {
    console.log(e);

    actualElement.style.top = e.clientY + 'px';
    actualElement.style.left = e.clientX + 'px';
};

const onMouseUp = (e) => {
    const mouseUpItem = e.target;

    items.insertBefore(actualElement, mouseUpItem);

    actualElement.classList.remove('dragged');
    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
};



items.addEventListener('mousedown', (e) => {
    e.preventDefault();

    actualElement = e.target;
    
    actualElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
})