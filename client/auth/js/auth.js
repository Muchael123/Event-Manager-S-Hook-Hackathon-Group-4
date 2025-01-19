const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginSection = document.querySelector('section:first-of-type');
const signupSection = document.getElementById('signup');

const token = localStorage.getItem('token');
if (token) {
    window.location.replace('/home');
}

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

   try{
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
    
    const myAlert = document.createElement('div');
    if(!response.ok){
        const result = await response.json();
        console.log(result.message, response.status);
        alert(result.message);
        return;
    }
    const result = await response.json();
    console.log(result);
    alert('User registered successfully');
    window.location.reload();
   }
   catch(error){
       console.log(error);
       alert('An error occured');
    }
}

async function loginUser(event) {
    event.preventDefault();
    const form = document.getElementById('login-form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try{
        const response = await fetch('https://event-manager-g4.vercel.app/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        });
        if(!response.ok){
            const result = await response.json();
            console.log(result.message, response.status);
            alert(result.message);
            return;
        }
        const result = await response.json();
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user.id);
        localStorage.setItem('userName', result.user.name);
        alert('Login successful');
        window.location.reload();
    }
    catch(error){
        console.log(error);
        alert('An error occured. Please try again');
    }

}


document.getElementById('signup-form').addEventListener('submit', signupUser);
document.getElementById('login-form').addEventListener('submit', loginUser);