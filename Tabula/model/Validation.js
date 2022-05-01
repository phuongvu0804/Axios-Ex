function Validator (formSelector) {
    var formRules = {}

    var validateRules = {
        required: function (value) { 
            return value ? undefined : 'The field is required.'
        },
        email: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : 'The e-mail address entered is invalid.'
        }
    }

    var formElement = document.querySelector(formSelector);
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|')
            
            for (var rule of rules) {
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(validateRules[rule])
                } else {
                    formRules[input.name] = [validateRules[rule]]
                }

            }

        }

        function handleValidate (event) {
            var rules = formRules[event.target.name]
            var errorMessage
            for (var rule of rules) {
                errorMessage = rule(event.target.value)
            }

            if (errorMessage) {
                var formGroup = event.target.closest('.form-group')
                var messageElement = formGroup.querySelector('.error-msg')
                var formMessage = formElement.querySelector('.form__msg')

                messageElement.innerText = errorMessage
                formMessage.classList.remove('display-none')
                formMessage.style.borderColor = '#ffb900'
                formMessage.innerText = 'One or more fields have an error. Please check and try again.'
            }

            return !errorMessage
        }


        formElement.onsubmit = function (event) {
            event.preventDefault()

            var inputs = formElement.querySelectorAll('[name][rules]')
            var isValid = true

            for (var input of inputs) {
                if (!handleValidate({target:input})) {
                    isValid = false
                }
            }

            if (isValid) {
                var formMessage = formElement.querySelector('.form__msg')

                formMessage.classList.remove('display-none')
                formMessage.style.borderColor = '#dc3232'
                formMessage.innerText = 'There was an error trying to send your message. Please try again later.'
            }

        }

    }
    
}