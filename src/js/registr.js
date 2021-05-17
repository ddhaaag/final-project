const password = document.getElementById("password"),
confirmPassword = document.getElementById("confirm_password"),
emailInput = document.getElementById('email'),
passInput = document.getElementById('password'),
form = document.querySelector('.modal-content'),
sighUp = document.querySelector('.signupbtn');

fields = form.querySelectorAll('.field');

// function validatePassword(){
//     if(password.value != confirmPassword.value) {
//       confirmPassword.setCustomValidity("Passwords Don't Match");
//     } else {
//       confirmPassword.setCustomValidity('');
//     }
//   }
  
//   password.onchange = validatePassword;
//   confirmPassword.onkeyup = validatePassword;

// sighUp.addEventListener('click', (e) =>  {
//   e.preventDefault();

//   fetch('../dummy_data/users.json')
//       .then(res => res.json())
//       .then(data => {
//           checkEmail(data);
//           console.log(data)
//       })
// })

// function checkEmail(data) {
//   const [admin, user] = data;
//   if (emailInput.value == admin.mail || emailInput.value == user.mail) {
//       console.log('hi')
//       if ( admin.password == passInput.value ) {
//           alert(`успешная авторизация!`);
//           setTimeout(function() {
//               window.location.href = '../index.html';
//             }, 2 * 1000);
//       } else {
//           alert(`пароль неправильный!`)
//       }
//   } else {
//       alert(`Такого пользователя нет`);
//   }    
// }

var generateError = function (text) {
  var error = document.createElement('div')
  error.className = 'error'
  error.style.color = 'red'
  error.innerHTML = text
  return error
}

var removeValidation = function () {
  var errors = form.querySelectorAll('.error')

  for (var i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

var checkFieldsPresence = function () {
  for (var i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log('field is blank', fields[i])
      var error = generateError('Cannot be blank')
      form[i].parentElement.insertBefore(error, fields[i])
    }
  }
}

var checkPasswordMatch = function () {
  if (password.value !== confirmPassword.value) {
    console.log('not equals')
    var error = generateError('Password doesnt match')
    password.parentElement.insertBefore(error, password)
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

  // window.location.href = "http://stackoverflow.com";
})