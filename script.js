document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const noticeModal = document.getElementById('noticeModal');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const proceedButton = document.getElementById('proceedButton');
    const modalProceedButton = noticeModal.querySelector('#modalProceedButton'); 

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const password = document.getElementById('password').value;

      if (password === 'demotesting') {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('demouser', 'true');
        const expirationTime = new Date().getTime() + (5 * 60 * 1000);
        sessionStorage.setItem('expirationTime', expirationTime);
        window.location.href = 'DemoAccess.html'; 
        return;
      }

      fetch('https://back-game-1.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: password,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);

          if (data.success) {
            const expirationTime = new Date().getTime() + (5 * 60 * 1000);
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('demouser', 'false');
            sessionStorage.setItem('expirationTime', expirationTime);
            noticeModal.style.display = 'block';
          } else {
            alertWithLink('Invalid Key. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error occurred during key validation:', error.message);
          alertWithLink('An error occurred. Please try again later.');
        });
    });

    function alertWithLink(message) {
      const alertMessage = message + ' Invalid, please buy from <a href="https://www.instagram.com/">Instagram</a>.';
      const tempElement = document.createElement('div');
      tempElement.innerHTML = alertMessage;
      alert(tempElement.textContent || tempElement.innerText);
      setTimeout(function () {
        window.location.href = 'https://www.instagram.com/';
      }, 5000);
    }

    noticeModal.querySelector('.close').addEventListener('click', function () {
      noticeModal.style.display = 'none';
    });

    proceedButton.addEventListener('click', function () {
      if (agreeCheckbox.checked) {
        window.location.href = 'login.html';
      } else {
        alert('Please agree to the terms and conditions to proceed.');
      }
    });

    modalProceedButton.addEventListener('click', function () {
      noticeModal.style.display = 'none';
      window.location.href = 'DemoAccess.html';
    });
});
