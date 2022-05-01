var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document);
function getEle (id) {
    return document.getElementById(id)
}
var userList = []
var validator = new Validator()

//Get user's value
function getUserValue () {
    var taiKhoan = getEle('TaiKhoan').value
    var hoTen = getEle('HoTen').value
    var matKhau = getEle('MatKhau').value
    var email = getEle('Email').value
    var hinhAnh = getEle('HinhAnh').value
    var loaiNguoiDung = getEle('loaiNguoiDung').value
    var loaiNgonNgu = getEle('loaiNgonNgu').value
    var moTa = getEle('MoTa').value

    var isValid = true

    isValid &= validator.isRequired(taiKhoan,'TaiKhoan', 'Vui lòng nhập trường này') 
    && validator.isExisted(taiKhoan,'TaiKhoan', 'Tài khoản này đã tồn tại', userList)

    isValid &= validator.isRequired(hoTen,'HoTen', 'Vui lòng nhập trường này') 
    && validator.isString(hoTen, 'HoTen', 'Trường này phải là chữ cái')

    isValid &= validator.isRequired(matKhau,'MatKhau', 'Vui lòng nhập trường này') 
    && validator.isValidPassword(matKhau, 'MatKhau', 'Vui lòng nhập ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số')
    && validator.minMaxLength(matKhau, 'MatKhau', 'Vui lòng nhập tối đa 8 và tối thiểu 6 ký tự', 6, 8)
    
    isValid &= validator.isRequired(email,'Email', 'Vui lòng nhập trường này') 
    && validator.isEmail(email, 'Email', 'Trường này phải là email')

    isValid &= validator.isRequired(hinhAnh,'HinhAnh', 'Vui lòng nhập trường này') 
    && validator.isImg(hinhAnh, 'HinhAnh', 'Trường này phải là hình ảnh')

    isValid &= validator.isRequired(loaiNguoiDung, 'loaiNguoiDung', 'Vui lòng nhập trường này') 

    isValid &= validator.isRequired(loaiNgonNgu, 'loaiNgonNgu', 'Vui lòng nhập trường này') 

    isValid &= validator.isRequired(moTa, 'MoTa', 'Vui lòng nhập trường này') 
    && validator.maxLength(moTa, 'MoTa', 'Vui lòng nhập tối đa 60 ký tự', 60)

    if (isValid) {
        var user = new User (taiKhoan, hoTen, matKhau, email, hinhAnh, loaiNguoiDung, loaiNgonNgu, moTa)
        userList.push(user)
        return user
    }
    return null

}

//Render user list to view
var services = new Services();
function getUserList () {
    services.fetchData()
        .then (function (response) {
            userList = response.data
            renderToView(response.data)
        })
        .catch (function (error) {
            console.log(error)
        })
}

function renderToView (users) {
    var htmls = users.map(function (user) {
        return `
            <tr>
                <td>${user.id}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="changeUser(${user.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Xoá</button>
                </td>
            </tr>
        `
    }).join('')
    var userTable = getEle('tblDanhSachNguoiDung')
    userTable.innerHTML = htmls
}

getUserList()

//Delete users
function deleteUser (id) {
    services.deleteUserById(id)
        .then(function (response) {
            getUserList(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}


//Add users
var openAddModalBtn = getEle('btnThemNguoiDung')
openAddModalBtn.onclick = function () {
    //Sửa tiêu đề modal và thêm nút bấm
    $('#myModal .modal-title').innerText = 'Thêm tài khoản'
    $('#myModal .modal-footer').innerHTML = '<button class="btn btn-success" onclick="addUser()">Thêm</button>'

    //Xoá các thông báo lỗi và input đã nhập
    var errorElements = $$('.error-msg')
    for (var errorElement of errorElements) {
        errorElement.innerText = ''
    }
}

var closeModalBtn = $('button.close')

function addUser () {
    var newUser = getUserValue()
    if (newUser) {
            console.log(newUser)
            services.addUser(newUser)
                .then(function (response) {
                    getUserList(response.data)
                    closeModalBtn.click()
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

//Change users
function changeUser (id) {
    //Sửa tiêu đề modal và thêm nút bấm
    $('#myModal .modal-title').innerText = 'Sửa tài khoản'
    $('#myModal .modal-footer').innerHTML = `<button class="btn btn-success" onclick="updateUser(${id})">Cập nhập</button>`
}

function updateUser (id) {
    var changedUser = getUserValue()

    if (changedUser) {
        services.updateUserById(id, changedUser)
            .then(function (response) {
                getUserList(response.data)
                closeModalBtn.click()
            })
    }
    
}