function Validator (inputSelector) {


    this.isRequired = function (value, inputSelector, message) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var inputType = document.getElementById(inputSelector).type

        switch (inputType) {
            case 'select-one':
                if (value !== 'Chọn loại người dùng' && value !== 'Chọn ngôn ngữ') {
                    errorElement.innerText = ''
                    return true
                } else {
                    errorElement.innerText = message
                    return false
                }
            default:
                if (value !== "") {
                    errorElement.innerText = ''
                    return true
                } else {
                    errorElement.innerText = message
                    return false
                }
            }

    }

    this.isExisted = function (value, inputSelector, message, userList) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var isExisted = false

        for (var i = 0; i < userList.length; i++) {
            var user = userList[i]
            
            if (user.taiKhoan === value) {
                isExisted = true
                console.log(user)
                break
            } 

        }

        if (isExisted) {
            console.log(user, isExisted)
            var groupBlock = document.getElementById(inputSelector).parentElement
            groupBlock.querySelector('.error-msg').innerText = message
            return false
        } else {
            errorElement.innerText = ''
            return true
        }

    }

    this.isString = function (value, inputSelector, message) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var regex = '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
        
        if (value.match(regex)) {
            errorElement.innerText = ''
            return true
        } else {
            errorElement.innerText = message
            return false
        }

    }

    this.isValidPassword = function (value, inputSelector, message) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (value.match(regex)) {
            errorElement.innerText = ''
            return true
        } else {
            errorElement.innerText = message
            return false
        }

    }

    this.isEmail = function (value, inputSelector, message) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (value.match(regex)) {
            errorElement.innerText = ''
            return true
        } else {
            errorElement.innerText = message
            return false
        }

    }

    this.isImg = function (value, inputSelector, message) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        
        if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value)) {
            errorElement.innerText = ''
            return true
        } else {
            errorElement.innerText = message
            return false
        }
    }

    this.maxLength = function (value, inputSelector, message, max) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var valueLength = value.trim().length

        if (valueLength <= max) {
            errorElement.innerText = ''
            return true
        } else {
            errorElement.innerText = message
            return false
        }
    }

    this.minMaxLength = function (value, inputSelector, message, min, max) {
        var groupBlock = document.getElementById(inputSelector).parentElement
        var errorElement = groupBlock.querySelector('.error-msg')
        var valueLength = value.trim().length

        if (valueLength <= max && valueLength >= min) {
            errorElement.innerText = ''
            return true
        } else {
            errorElement.innerText = message
            return false
        }

    }
}