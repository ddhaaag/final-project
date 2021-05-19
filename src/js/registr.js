const password = document.getElementById("password"),
confirmPassword = document.getElementById("confirm_password"),
emailInput = document.getElementById('email'),
passInput = document.getElementById('password'),
form = document.querySelector('.modal-content'),
sighUp = document.querySelector('.signupbtn'),

fields = form.querySelectorAll('.field');

let generateError = function (text) {
  let error = document.createElement('div')
  error.className = 'error'
  error.style.color = 'red'
  error.innerHTML = text
  return error
}

let removeValidation = function () {
  let errors = form.querySelectorAll('.error')

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

let checkFieldsPresence = function () {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      let error = generateError('Cannot be blank')
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }
}

let checkPasswordMatch = function () {
  if (password.value !== confirmPassword.value) {
    console.log('not equals')
    let error = generateError('Password doesnt match')
    password.parentElement.insertBefore(error, password)
  } else {
    return false;
  }
}

function checkEmail(mail) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
}

function validate() {
  const $result = $("#result");
  const email = $("#email").val();
  $result.text("");

  if (checkEmail(email)) {
    $result.text(email + " is valid :)");
    $result.css("color", "green");
  } else {
    $result.text(email + " is not valid :(");
    $result.css("color", "red");
  }
  return false;
}

function changePage(value) {

  fetch('../dummy_data/users.json')
      .then(res => res.json())
      .then(data => {
          if (data[0]['mail'] === value ) {
            window.location.href = "../common/admin.html";
          } else if (data[1]['mail'] === value) {
            window.location.href = "../common/user.html";
          } else {
            alert(`Проверьте ваши данные!`);
          }
      })
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log(emailInput.value)
  removeValidation()

  checkFieldsPresence()

  checkPasswordMatch()

  checkEmail(emailInput.value)

  changePage(emailInput.value)
})
