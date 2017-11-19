import autosize from 'autosize';

export default () => {
    const $form = $('.form');
    const $inputs = $('.form__input');
    const $loader = $('.form__loader');
    const $success = $('.form__success');
    const $fail = $('.form__fail');
    const $file = $('.file__name');


    $form.on('submit', submitForm);
    $inputs.on('input', removeErrorMessages);
    $inputs.on('focus', floatedLabelOn);
    $inputs.on('blur', floatedLabelOff);
    autosize($('.form__input--textarea'));

    function submitForm(event) {
        event.preventDefault();
        const $this = $(this);
        const data = new FormData($this[0]);

        showLoadSpinner();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3012/mail',
            data: data,
            cache: false,
            contentType: false,
            processData: false
        })
            .done(response => {
                hideLoadSpinner();
                if (response.errors) {
                    showErrorMessages(response.errors);
                } else {
                    showSuccess();
                    setTimeout(function () {
                        resetForm();
                        hideSuccess();
                        $inputs.siblings('.form__label').removeClass('is-focus');
                        autosize.update($('.form__input--textarea'));
                    }, 3000);
                }
            })
            .fail(error => {
                hideLoadSpinner();
                showFail();
                setTimeout(function () {
                    hideFail();
                }, 3000);
                console.log(error);
            })
    }

    function showErrorMessages(errors) {
        $form.removeClass('is-blur');
        errors.forEach(item => {
            const $input = $(`[name=${item.param}]`);
            $input.addClass('is-error');
            $input.after(`<span class="form__error">${item.msg}</span>`);
        })
    }

    function removeErrorMessages() {
        const $this = $(this);
        $this.removeClass('is-error');
        $this.siblings('.form__error').remove();
        floatedLabelOn();
    }

    function floatedLabelOn() {
        const $this = $(this);
        $this.siblings('.form__label').addClass('is-focus');
    }

    function floatedLabelOff() {
        const $this = $(this);
        if ($this.val() === '')
            $this.siblings('.form__label').removeClass('is-focus');
    }

    function showLoadSpinner() {
        $form.addClass('is-blur');
        $loader.addClass('is-visible');
    }

    function hideLoadSpinner() {
        $loader.removeClass('is-visible');
    }

    function showSuccess() {
        $success.addClass('is-visible');
    }

    function hideSuccess() {
        $form.removeClass('is-blur');
        $success.removeClass('is-visible');
    }

    function showFail() {
        $fail.addClass('is-visible');
    }

    function hideFail() {
        $form.removeClass('is-blur');
        $fail.removeClass('is-visible');
    }

    function resetForm() {
        $form[0].reset();
        $file.text('Upload your resume (Optional)');
    }
}

