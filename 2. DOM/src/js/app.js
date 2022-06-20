// TODO: write code here

const news = [
    'Microsoft представила новую операционную систему Windows 11',
    'Представлен самый дешёвый смартфон в мире',
    'Steam усложнил покупку игр по сниженным ценам',
    'В сентябре SpaceX Starlink сможет обеспечить спутниковое интернет-покрытие по всей Земле',
    'Xiaomi представила камеру для смарт-телевизоров Mi TV Webcam по цене $30'
]

document.addEventListener('DOMContentLoaded', () => {
    const widget = new NewsWidget(document.querySelector('.news-widget'));

    window.widget = widget;

    const newsInterval = setInterval(() => {
        const title = news.pop();

        widget.addNewNews(title);
        if(!news.length) clearInterval(newsInterval);
    }, 10000);

    const input = document.querySelector('.input');

    document.querySelector('.set-attribute').addEventListener('click', () => {
        input.setAttribute('value', 'attribute');
    });

    document.querySelector('.set-value').addEventListener('click', () => {
        input.value = 'value';
    });
})