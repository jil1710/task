// Select The Elements
var big_wrapper;
var hamburger_menu;

big_wrapper = document.querySelector(".big-wrapper");
hamburger_menu = document.querySelector(".hamburger-menu");

hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
});


// typing animation constructor call
var typing = new Typed(".type", {
    strings: ["", "Cricketer", "Web Developer", "Software Engineer", "Web Designer", "Android Developer"],
    typeSpeed: 100,
    backSpeed: 40,
    loop: true,
});




var uemail = document.getElementById('uemail')
var upass = document.getElementById('upass')
var pic = document.getElementById('pic')
var preview = document.getElementById('load-img')
var url;

function showData() {
    var userList;
    if (localStorage.getItem("session") === null) {
        userList = []
    }
    else {
        userList = JSON.parse(localStorage.getItem("session"))
    }

    var data;
    if (localStorage.getItem("users") === null) {
        data = []
    }
    else {
        data = JSON.parse(localStorage.getItem("users"))
    }

    var currentUser = data.find(ele => ele.email == userList.email);
    document.getElementById('username').innerHTML = userList.username
    document.getElementById('profile-pic').src = currentUser.profile
    document.getElementById('contact').href = 'mailto:' + userList.email

    document.getElementById('update').onclick = (e) => {
        preview.src = currentUser.profile
        url = currentUser.profile
        uemail.value = currentUser.email
        upass.value = currentUser.password
    }

    upass.onfocus = () => {
        upass.setAttribute("type", "text")
    }
    upass.onblur = () => {
        upass.setAttribute("type", "password")
    }

    // file reader for image to store in local storage
    pic.addEventListener('change', function (e) {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener('load', () => {
            preview.src = reader.result
            url = reader.result
        });

    })

    document.getElementById('setdata').onclick = (e) => {
        e.preventDefault()
        let index = data.findIndex(item => item.email == currentUser.email)
        data[index].profile = url
        data[index].password = upass.value

        localStorage.setItem('users', JSON.stringify(data));
        showData()
        Swal.fire({
            title: 'Hurray !',
            html: `Your profile is successfully updated 😊.`,
            icon: 'success'
        })
        var myModalEl = document.getElementById('ModalForm');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    }

    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('session');
        location.href = '../'
    }


}
showData()

