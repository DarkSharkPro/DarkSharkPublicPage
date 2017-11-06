export default () => {
    const inputFile = document.querySelector( '.file' );
    const fileNameHolder = document.querySelector('.file__name');

    inputFile.addEventListener('change', event => {
        const fileName = event.target.value.split( '\\' ).pop();
        if (fileName) fileNameHolder.innerHTML = fileName;
    })
}
