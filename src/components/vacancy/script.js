export default () => {
    const $readMoreLessBtn = $('.vacancy__read-more');
    
    $readMoreLessBtn.on('click', collapseVacancy);
    
    function collapseVacancy(event) {
        event.preventDefault();
        this.expand = !this.expand;
        const $rest = $('.vacancy__rest');

        if (this.expand) {
            $(this).text("Show less");
            $rest.slideDown();
        } else {
            $(this).text("Show more");
            $rest.slideUp();
        }
    }
}
