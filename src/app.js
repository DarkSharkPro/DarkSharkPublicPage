import spritesData from '../dist/assets/metadata.json';
import sayHello from './components/header/script';
sayHello();

// todo
const svgUseTags = document.querySelectorAll('svg > use');
spritesData.forEach(data => {
    [...svgUseTags].forEach(tag => {
        const viewBox = tag.getAttribute('xlink:href');
        if (viewBox.includes(data.id)) tag.parentElement.setAttribute('viewBox', data.viewBox)
    })
});