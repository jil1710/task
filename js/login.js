var forms = document.querySelectorAll('.needs-validation')
var email = document.getElementById('email')
var password = document.getElementById('password')
var remember = document.getElementById('remember')

if(document.cookie){
    var setter = JSON.parse(document.cookie.replace("remember=",""))
    email.value = setter.email
    password.value = setter.password
    remember.checked = true
}

// Loop over them and prevent submission
Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
            }
            else {
                event.preventDefault()

                // if user check remember
                if (remember.checked) {
                    document.cookie = "remember=" + JSON.stringify({ email: email.value, password: password.value })
                }
                else{
                    document.cookie = "remember=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }

                var userList;
                if (localStorage.getItem("users") === null) {
                    userList = []
                }
                else {
                    userList = JSON.parse(localStorage.getItem("users"))
                }

                var checkCredential = userList.find(ele => ele.email == email.value);

                // If user type valid credential then redirect to home page
                if (checkCredential) {

                    if (checkCredential.password == password.value) {
                        email.value = ""
                        password.value = ""
                        form.classList.remove('was-validated')
                        var data = {
                            username:checkCredential.username,
                            email:checkCredential.email,
                        }
                        localStorage.setItem("session",JSON.stringify(data))
                        window.location.href = "./screen/home.html"

                    }
                    else {
                        Swal.fire({
                            title: 'Opps 😢.',
                            html: `Password for <b>${email.value}</b> ID. is invalid! <b>Try again 😊</b>`,
                            icon: 'warning'
                        })
                        email.value = ""
                        password.value = ""
                    }
                }
                else {
                    Swal.fire({
                        title: 'Opps 😢.',
                        html: `<b>${email.value}</b> ID. is doesn't Exist! <b>Try again 😊</b>`,
                        icon: 'warning'
                    })
                    email.value = ""
                    password.value = ""
                    form.classList.remove('was-validated')
                }

            }

        }, false)
    })