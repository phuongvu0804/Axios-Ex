//Header
var mobileMenu = document.querySelector('.navbar-mobile-wrapper');
var mobileMenu_openBtn = document.querySelector('.mobile-menu__trigger');
var mobileMenu_closeBtn = document.querySelector('.mobile-menu__close');
var header = document.querySelector('header')

//Header's event
document.onscroll = function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop
    if (scrollTop !== 0) {
        header.classList.add('onScrolled');
    } else {
        header.classList.remove('onScrolled');

    }

}

//Mobile's & tablet's header
mobileMenu_openBtn.onclick = function () {
    mobileMenu_openBtn.classList.toggle('display-none')
    document.querySelector('.logo a').classList.toggle('display-none')
    mobileMenu_closeBtn.classList.toggle('display-none')

    //Header's position changes
    header.classList.toggle('headerMoveRight')

    //Mobile's position menu appears
    Object.assign(mobileMenu.style, {
        transform: 'translateX(0)',
        transition: 'all 0.5s'
    });
}

mobileMenu_closeBtn.onclick = function () {
    mobileMenu_openBtn.classList.toggle('display-none')
    document.querySelector('.logo a').classList.toggle('display-none')
    mobileMenu_closeBtn.classList.toggle('display-none')

    //Header's position changes
    header.classList.toggle('headerMoveRight')


    //Mobile's position menu appears
    Object.assign(mobileMenu.style, {
        transform: 'translateX(calc(-100% - 10px))',
        transition: 'all 0.5s'
    });

}


//----------------------------------------------------------------
//Render teacher list
var services = new Services(); 
function getTeacherList() {
    services.fetchData()
        .then (function (response) {
            var userList = response.data
            var teacherList = []

            for (var i = 0; i < userList.length; i++) {
                var user = userList[i]
                if (user.loaiND === 'GV') {
                    teacherList.push(user)
                }
            }

            renderView(teacherList)
        })
        .catch (function () {

        })
}

function renderView (teachers) {
    var htmls = teachers.map(function (teacher) {
        return `
        <div class="col col-lg-3 col-md-6 col-12">
            <div class="card teacher__card">
                <img class="card-img-top teacher__photo" src="./images/${teacher.hinhAnh}" alt="Teacher's photo">
                <div class="card-body teacher__info">
                    <span class="teacher-info__country">${teacher.ngonNgu}</span>
                    <h4 class="card-title teacher-info__name">${teacher.hoTen}</h4>
                    <p class="card-text teacher-info__desc">${teacher.moTa}</p>
                </div>
            </div>
        </div>
        `
    }).join('')
    document.querySelector('#teacher .container .row').innerHTML = htmls
}

getTeacherList()