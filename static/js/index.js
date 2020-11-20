const handleLoginSubmit = (data) => {
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result.error) {
        localStorage.setItem('token', result.token);
      } else {
        console.log(result.error);
      }
    })
    .catch((error) => console.log(error));
};

document.getElementById('login').addEventListener('submit', (event) => {
  event.preventDefault();
  const loginForm = document.forms['login'];
  const data = {
    email: loginForm.elements['email'].value,
    password: loginForm.elements['password'].value,
  };
  handleLoginSubmit(data);
});
