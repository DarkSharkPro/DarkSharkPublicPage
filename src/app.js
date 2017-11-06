import slick from 'slick-carousel';
import workspaceCarousel from './components/carousel-workspace/script';
import simpleCarousel from './components/carousel-simple/script';
import carouselCentered from './components/carousel-centered/script';
import fileInputMask from './components/input-file/script';


workspaceCarousel();
simpleCarousel();
carouselCentered();
fileInputMask();

// // todo
// import spritesData from '../dist/assets/metadata.json';
// const svgUseTags = document.querySelectorAll('svg > use');
//
// spritesData.forEach(data => {
//     [].forEach.call(svgUseTags, tag => {
//         const viewBox = tag.getAttribute('xlink:href');
//         if (viewBox.includes(data.id))
//             tag.parentElement.setAttribute('viewBox', data.viewBox)
//     })
// });