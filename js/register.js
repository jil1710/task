var forms = document.querySelectorAll('.needs-validation')
var email = document.getElementById('email')
var username = document.getElementById('username')
var dob = document.getElementById('dob')
var password = document.getElementById('password')
var cpassword = document.getElementById('cpassword')
var ele;

function handleChange(src) {
    ele = src.value
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


                // first of all check for confirm password and password match or not !
                if (password.value === cpassword.value) {

                    var userList;
                    if (localStorage.getItem("users") === null) {
                        userList = []
                    }
                    else {
                        userList = JSON.parse(localStorage.getItem("users"))
                    }

                    var checkUserAlreadyExist = userList.find(ele => ele.email == email.value);
                    if (!checkUserAlreadyExist) {
                        userList.push({
                            username: username.value,
                            email: email.value,
                            dob: dob.value,
                            gender: ele,
                            password: password.value,
                            profile: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                        })

                        localStorage.setItem("users", JSON.stringify(userList))
                        Swal.fire({
                            html: `Welcome <b>${username.value}</b> 😊.`,
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location = '../'
                            }
                        })
                        username.value = ""
                        email.value = ""
                        dob.value = ""
                        password.value = ""
                        cpassword.value = ""
                        form.classList.remove('was-validated')

                    }
                    else {
                        Swal.fire(
                            'Opps 😢.',
                            `${email.value} ID. is already Exist! Try with other one 😊`,
                            'warning'
                        )
                        Swal.fire({
                            title: 'Opps 😢.',
                            html: `<b>${email.value}</b> ID. is already Exist! <b>Try with other one 😊</b>`,
                            icon: 'warning'
                        })
                    }
                    email.value = ""
                    form.classList.remove('was-validated')

                } else {
                    Swal.fire(
                        'Opps 😢.',
                        `Confirm password not match with your actual password! 😊`,
                        'warning'
                    )
                    password.value = ""
                    cpassword.value = ""
                }

            }

        }, false)
    })