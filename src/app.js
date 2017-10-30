import sayHello from './components/header/script';
sayHello();

// todo
// import spritesData from '../dist/assets/metadata.json';
// const svgUseTags = document.querySelectorAll('svg > use');
// spritesData.forEach(data => {
//     [].forEach.call(svgUseTags, tag => {
//         const viewBox = tag.getAttribute('xlink:href');
//         if (viewBox.includes(data.id)) tag.parentElement.setAttribute('viewBox', data.viewBox)
//     })
// });