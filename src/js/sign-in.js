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
})

function checkEmail(data) {
    const [admin, user] = data;
    if (emailInput.value == admin.mail || emailInput.value == user.mail) {
        console.log('hi')
        if ( admin.password == passInput.value ) {
            alert(`успешная авторизация!`);
            setTimeout(function(){
                window.location.href = '../index.html';
              }, 2 * 1000);
        } else {
            alert(`пароль неправильный!`)
        }
    } else {
        alert(`Такого пользователя нет`);
    }    
}