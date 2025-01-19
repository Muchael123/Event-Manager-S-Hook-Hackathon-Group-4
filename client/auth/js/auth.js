const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginSection = document.querySelector('section:first-of-type');
const signupSection = document.getElementById('signup');

showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginSection.style.display = 'none';
  signupSection.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupSection.style.display = 'none';
  loginSection.style.display = 'block';
});

async function signupUser(event) {
    event.preventDefault();

    const form = document.getElementById('signup-form');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    if (data.password !== data.confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    console.log(data);

    const response = await fetch('https://event-manager-g4.vercel.app/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
        }),
    });

    const result = await response.json();
    console.log(result);

    if (result.status === 'success') {
        alert('Signup successful');
        location.reload();
    } else {
        alert(result.error);
    }
}


document.getElementById('signup-form').addEventListener('submit', signupUser);