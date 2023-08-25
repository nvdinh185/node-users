var form = document.forms['update-form'];

function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var edId = getParameterByName('id');

async function getUserById() {
    try {
        var userById = await axios({
            method: "GET",
            url: `http://localhost:3000/users/${edId}`,
        });
        userById = userById.data;

        var id = form.querySelector('input[name="id"]');
        id.value = userById.id;

        var email = form.querySelector('input[name="email"]');
        email.value = userById.email;

        var password = form.querySelector('input[name="password"]');
        password.value = userById.password;

        var fullname = form.querySelector('input[name="fullname"]');
        fullname.value = userById.fullname;

        var avatar = form.querySelector('#avatar');
        avatar.src = `avatar/${userById.avatar}`;

    } catch (error) {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi: ' + error;
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow'
        })
    }
}

getUserById();


form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formValue = {};
    for (const el of e.target) {
        if (el.name) {
            formValue[el.name] = el.value;
        }
    }
    formValue.avatar = 'edit.jpg';

    try {
        var results = await axios({
            method: "PUT",
            url: `http://localhost:3000/users/${formValue.id}`,
            data: formValue
        });

        //handle success
        // console.log('results: ', results);
        location = 'index.html';
    } catch (error) {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi: ' + error;
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow'
        })
    }
})