import autosize from 'autosize';
import validate from 'jquery-validation';
import additionalMethods from 'jquery-validation/dist/additional-methods';

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

        $this.validate({
            rules: {
                username: {required: true},
                email: {email: true, required: true},
                message: {required: true},
                uploads: {extension: "txt|pdf|doc|docx"}
            },
            messages: {
                username: {required: 'Please enter your name'},
                email: {email: 'Please enter correct email', required: 'Please enter correct email'},
                messages: {required: 'This field is required'},
                uploads: {extension: 'Only .pdf, .doc and .txt files allowed'}
            },
            errorClass: 'is-error',
            errorElement: 'span'
        });

        if ($this.valid()) {
            showLoadSpinner();

            $.ajax({
                type: 'POST',
                url: '/mail',
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

