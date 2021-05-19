const login = document.querySelector('.btn-login');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');

login.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('../dummy_data/users.json')
      .then(res => res.json())
      .then(data => {

        checkEmail(data);
    })
});

function checkEmail(data) {
    const [admin, user] = data;

    if (emailInput.value == admin.mail) {
        if (admin.password == passInput.value) {
            alert(`success`);
            window.location.href = "../common/admin.html";
        } else {
            alert(`пароль неправильный!`)
        }
    } else if (emailInput.value == user.mail) {
            
        if (user.password == passInput.value) {
            alert(`success`)
            window.location.href = "../common/user.html";
        } else {
            alert(`пароль неправильный!`)
        }

    } else {
        alert(`Такого пользователя нет`);
    }
}